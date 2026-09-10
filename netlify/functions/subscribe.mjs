/**
 * Final Light Quick Start signup.
 *
 * Subscribes an address to the EmailOctopus audience and applies the TAG below,
 * which is what the tag-triggered automation listens for. It must match an
 * existing tag name in EmailOctopus exactly - a mismatch silently creates a new
 * tag and the automation never fires.
 *
 * EmailOctopus v2 (https://emailoctopus.com/api-documentation/v2):
 *   - auth is `Authorization: Bearer <key>` (v1's api_key-in-body is legacy)
 *   - PUT /lists/{id}/contacts is an upsert, so one call could both create and
 *     tag. We deliberately don't do that: an upsert has to send a `status`, and
 *     that status would also be applied to people who already exist - flipping
 *     an unsubscribe back to subscribed, or promoting a pending contact past
 *     their double opt-in confirmation. So we read the contact first and only
 *     send `status` when we're actually creating one.
 *   - a contact can be addressed by an MD5 hash of its lowercased address
 *   - `tags` is an object of name -> boolean, and tags not named in it are left
 *     alone, so adding ours never disturbs a contact's existing tags
 */

import { createHash } from "node:crypto";

const API_BASE = "https://api.emailoctopus.com";
const TAG = "Final Light QS";
const SIGNUP_PAGE = "/projects/final-light-ttrpg/";

// The list's double opt-in setting effectively never changes, so remember it
// for the life of the container instead of looking it up on every submit.
let doubleOptInCache = null;

export const config = { path: "/api/subscribe" };

export default async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  // Trimmed: a stray newline pasted into a dashboard env var makes a malformed
  // Bearer header (401) or a %0A in the list URL (400), both of which surface
  // as an identical, unhelpful 502.
  const EO_API_KEY = env("EO_API_KEY");
  const EO_LIST_ID = env("EO_LIST_ID");
  if (!EO_API_KEY || !EO_LIST_ID) {
    console.error("subscribe: EO_API_KEY and/or EO_LIST_ID is not set");
    return json({ error: "The signup form isn't configured yet." }, 500);
  }

  const submission = await readSubmission(req);
  if (!submission) {
    return json({ error: "Invalid request." }, 400);
  }

  // Browsers that ran our JS post JSON; a no-JS native form post arrives
  // form-encoded, and those get HTML back instead of a raw JSON dump.
  const wantsHtml = submission.encoding === "form";

  // Honeypot. Bots fill in every field they can find, so a value here means we
  // report success without touching the list - a real error would invite a retry.
  if (submission.company) {
    return respond(wantsHtml, { ok: true, state: "created", pending: false });
  }

  const email = submission.email;
  if (!isEmailAddress(email)) {
    return respond(wantsHtml, { error: "Please enter a valid email address." }, 400);
  }

  try {
    const result = await subscribe(email, EO_LIST_ID);
    return respond(wantsHtml, result.body, result.status);
  } catch (err) {
    console.error("subscribe: unexpected failure", err);
    return respond(wantsHtml, { error: "Something went wrong. Please try again." }, 502);
  }
};

async function subscribe(email, listId) {
  const contactId = createHash("md5").update(email).digest("hex");
  const existing = await eo(`/lists/${encodeURIComponent(listId)}/contacts/${contactId}`);

  if (existing.status === 200) {
    // Someone who opted out doesn't get quietly opted back in, and doesn't get
    // tagged either - the tag is what triggers the automation to email them.
    if (existing.payload?.status === "unsubscribed") {
      return {
        status: 200,
        body: {
          ok: false,
          state: "unsubscribed",
          message:
            "That address unsubscribed from the list, so I can't add it back from here. " +
            "Sign up again from the newsletter box on the home page if you'd like back in.",
        },
      };
    }

    // Already on the list: add the tag and say nothing about status, so their
    // existing subscribed/pending state is left exactly as it was.
    const tagged = await eo(`/lists/${encodeURIComponent(listId)}/contacts/${contactId}`, {
      method: "PUT",
      body: { tags: { [TAG]: true } },
    });
    if (!tagged.ok) return upstreamFailure("tagging an existing contact", tagged);

    return {
      status: 200,
      body: { ok: true, state: "tagged", pending: existing.payload?.status === "pending" },
    };
  }

  if (existing.status === 404) {
    const pending = await usesDoubleOptIn(listId);
    const created = await eo(`/lists/${encodeURIComponent(listId)}/contacts`, {
      method: "PUT",
      body: {
        email_address: email,
        tags: { [TAG]: true },
        status: pending ? "pending" : "subscribed",
      },
    });
    if (!created.ok) return upstreamFailure("creating a contact", created);

    return { status: 200, body: { ok: true, state: "created", pending } };
  }

  return upstreamFailure("looking up a contact", existing);
}

async function usesDoubleOptIn(listId) {
  if (doubleOptInCache !== null) return doubleOptInCache;

  const list = await eo(`/lists/${encodeURIComponent(listId)}`);
  // Fail safe: if the setting can't be read, assume double opt-in so nobody is
  // ever marked subscribed without confirming. Not cached, so a blip doesn't stick.
  if (!list.ok) {
    console.error("subscribe: could not read double_opt_in, defaulting to pending");
    return true;
  }

  doubleOptInCache = Boolean(list.payload?.double_opt_in);
  return doubleOptInCache;
}

async function eo(path, { method = "GET", body } = {}) {
  const res = await fetch(API_BASE + path, {
    method,
    headers: {
      Authorization: `Bearer ${env("EO_API_KEY")}`,
      ...(body === undefined ? {} : { "content-type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const text = await res.text();
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      // Upstream sent something that isn't JSON; callers only need the status.
    }
  }

  return { status: res.status, ok: res.ok, payload };
}

/**
 * Log the upstream detail, hand the visitor something generic.
 *
 * Every misconfiguration looks like the same 502 from the browser, so name the
 * likely cause in the log. Verified against the live API:
 *   401 "Invalid key."       -> EO_API_KEY wrong or revoked
 *   400 "Bad request."       -> EO_LIST_ID malformed, or not a real list
 *   404 "Contact not found." -> genuinely absent contact (handled before here)
 */
function upstreamFailure(what, res) {
  let hint = "";
  if (res.status === 401 || res.status === 403) {
    // "the keys match" is easy to believe and hard to verify by eye. Fingerprint
    // the key so it can be compared against the local one without ever logging
    // the secret itself:  printf %s "$EO_API_KEY" | shasum -a 256
    const raw = process.env.EO_API_KEY || "";
    const key = env("EO_API_KEY");
    const fingerprint = createHash("sha256").update(key).digest("hex").slice(0, 12);
    hint =
      ` | EO_API_KEY sha256=${fingerprint} length=${key.length}` +
      ` had_surrounding_whitespace=${raw !== key} - if this fingerprint differs` +
      ` from your local key, Netlify is holding a different value`;
  } else if (res.status === 400) {
    hint = " | check EO_LIST_ID is the complete list UUID";
  }
  console.error(
    `subscribe: EmailOctopus rejected ${what}: ${res.status} ${res.payload?.detail || ""}${hint}`
  );

  const tooMany = res.status === 429;
  return {
    status: tooMany ? 429 : 502,
    body: {
      error: tooMany
        ? "Too many signups at once. Give it a moment and try again."
        : "Something went wrong signing you up. Please try again.",
    },
  };
}

async function readSubmission(req) {
  const type = req.headers.get("content-type") || "";

  try {
    if (type.includes("application/json")) {
      const body = await req.json();
      return {
        encoding: "json",
        email: normalise(body?.email),
        company: normalise(body?.company),
      };
    }

    if (type.includes("form-urlencoded") || type.includes("multipart/form-data")) {
      const form = await req.formData();
      return {
        encoding: "form",
        email: normalise(form.get("email")),
        company: normalise(form.get("company")),
      };
    }
  } catch {
    return null;
  }

  return null;
}

function env(name) {
  return (process.env[name] || "").trim();
}

function normalise(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function isEmailAddress(value) {
  return value.length > 0 && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function respond(wantsHtml, body, status = 200) {
  return wantsHtml ? html(body, status) : json(body, status);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/** No-JS fallback: a plain confirmation page rather than a screenful of JSON. */
function html(body, status = 200) {
  const message = body.error || body.message || messageFor(body);
  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Final Light Quick Start</title>
<style>
  body { margin: 0; padding: 3rem 1.5rem; font-family: system-ui, sans-serif; line-height: 1.6; }
  main { max-width: 34rem; margin: 0 auto; }
</style>
</head>
<body>
<main>
<h1>Final Light Quick Start</h1>
<p>${escapeHtml(message)}</p>
<p><a href="${SIGNUP_PAGE}">Back to Final Light</a></p>
</main>
</body>
</html>`;

  return new Response(page, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function messageFor(body) {
  if (!body.ok) return "Something went wrong. Please try again.";
  if (body.pending) {
    return "Almost there - check your inbox for a confirmation email. The Quick Start follows once you've confirmed.";
  }
  return "You're on the list. The Quick Start is on its way.";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
  });
}
