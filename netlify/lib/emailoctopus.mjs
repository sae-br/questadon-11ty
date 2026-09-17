/**
 * Shared EmailOctopus plumbing for the signup function and its webhook.
 *
 * The two tags below are a handshake between the two, so they live here rather
 * than being spelled out twice - a typo in one copy would silently stop the
 * automation firing, which is exactly the failure this module exists to avoid.
 *
 *   TAG         the automation listens for this. Applying it is what sends the
 *               Quick Start, so it must only ever land on a contact who is
 *               already subscribed. Applying it to a pending contact burns the
 *               trigger: the tag-added event happens while they are ineligible,
 *               and confirming later adds no tag, so nothing ever fires.
 *
 *   PENDING_TAG a placeholder for someone who asked for the Quick Start but
 *               still owes us a double opt-in click. Nothing listens to it. The
 *               webhook swaps it for TAG once they confirm, which produces a
 *               genuine tag-added event on a subscribed contact.
 *
 * TAG must match the automation's trigger tag in EmailOctopus exactly; a
 * mismatch quietly creates a second tag and the automation never fires.
 */

export const API_BASE = "https://api.emailoctopus.com";
export const TAG = "Final Light QS";
export const PENDING_TAG = "Final Light QS unconfirmed";

/** Trimmed: a stray newline in a dashboard env var makes a malformed Bearer
 *  header (401) or a %0A in a list URL (400), both surfacing as the same 502. */
export function env(name) {
  return (process.env[name] || "").trim();
}

export async function eo(path, { method = "GET", body } = {}) {
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
 * True when a contact carries `name`.
 *
 * v2 returns tags as an array of names, but the webhook payload documents
 * `contact_tags` loosely, so an object of name -> boolean is accepted too
 * rather than silently reading as "untagged" if the shape ever differs.
 */
export function hasTag(contact, name) {
  const tags = contact?.tags;
  if (Array.isArray(tags)) return tags.includes(name);
  if (tags && typeof tags === "object") return Boolean(tags[name]);
  return false;
}

/** EmailOctopus reports status lowercase on the API, uppercase in webhooks. */
export function statusOf(contact) {
  return String(contact?.status || "").toLowerCase();
}
