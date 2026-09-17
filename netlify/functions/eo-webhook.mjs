/**
 * EmailOctopus webhook: sends the Quick Start once a contact confirms.
 *
 * subscribe.mjs cannot tag a pending contact for real - automations only run
 * for subscribed contacts, so the tag-added event would fire while they are
 * ineligible and confirming later adds no tag. It applies PENDING_TAG instead.
 * This endpoint swaps that for TAG at the moment they confirm, which produces a
 * genuine tag-added event on a subscribed contact and fires the automation.
 *
 * Notes on the webhook API (https://help.emailoctopus.com/article/314-webhooks):
 *   - there is no `contact.subscribed` event. A double opt-in confirmation
 *     arrives as `contact.updated` with contact_status SUBSCRIBED.
 *   - the body is an ARRAY of up to 1000 events, not a single event.
 *   - requests carry an EmailOctopus-Signature header: `sha256=` followed by
 *     the hex HMAC-SHA256 of the raw body, keyed with the endpoint's secret.
 *   - status is uppercase here and lowercase on the REST API.
 *
 * The payload is treated as a hint, never as fact: every contact it names is
 * re-read from the API before anything is changed. A forged request therefore
 * achieves nothing even if the signature check were somehow bypassed, since
 * only contacts genuinely subscribed AND genuinely carrying PENDING_TAG are
 * touched. That re-read also makes retries and duplicate deliveries safe - the
 * placeholder is gone after the first success, so a replay is a no-op.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

import { TAG, PENDING_TAG, env, eo, hasTag, statusOf } from "../lib/emailoctopus.mjs";

export const config = { path: "/api/eo-webhook" };

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed.", { status: 405 });
  }

  const secret = env("EO_WEBHOOK_SECRET");
  const listId = env("EO_LIST_ID");
  if (!secret || !listId) {
    console.error("eo-webhook: EO_WEBHOOK_SECRET and/or EO_LIST_ID is not set");
    return new Response("Not configured.", { status: 500 });
  }

  // Read the body as text, not JSON: the signature covers the exact bytes sent,
  // and re-serialising a parsed object would not reproduce them.
  const raw = await req.text();
  if (!isFromEmailOctopus(raw, req.headers.get("emailoctopus-signature"), secret)) {
    console.error("eo-webhook: rejected a request with a bad or missing signature");
    return new Response("Invalid signature.", { status: 401 });
  }

  let events;
  try {
    events = JSON.parse(raw);
  } catch {
    return new Response("Malformed body.", { status: 400 });
  }
  if (!Array.isArray(events)) events = [events];

  // One delivery can carry several events for the same contact; a Set keeps us
  // from reading and writing that contact more than once.
  const confirmed = new Set();
  for (const event of events) {
    if (event?.type !== "contact.updated" && event?.type !== "contact.created") continue;
    if (statusOf({ status: event?.contact_status }) !== "subscribed") continue;
    if (event?.list_id && event.list_id !== listId) continue;
    if (event?.contact_id) confirmed.add(event.contact_id);
  }

  // Failures are logged and swallowed. Returning an error would make
  // EmailOctopus redeliver the whole batch, replaying every contact in it to
  // retry the one that failed.
  for (const contactId of confirmed) {
    try {
      await promote(contactId, listId);
    } catch (err) {
      console.error(`eo-webhook: could not promote ${contactId}`, err);
    }
  }

  return new Response(null, { status: 204 });
};

/** Swap the placeholder for the real tag, if this contact is owed the Quick Start. */
async function promote(contactId, listId) {
  const path = `/lists/${encodeURIComponent(listId)}/contacts/${encodeURIComponent(contactId)}`;

  const contact = await eo(path);
  if (!contact.ok) {
    console.error(`eo-webhook: could not read ${contactId}: ${contact.status}`);
    return;
  }

  // Confirm against the API rather than trusting contact_status in the payload.
  if (statusOf(contact.payload) !== "subscribed") return;

  // No placeholder means this is an ordinary newsletter confirmation, or a
  // delivery we have already handled. Either way there is nothing to do.
  if (!hasTag(contact.payload, PENDING_TAG)) return;

  // Adding TAG is what fires the automation. Removing the placeholder in the
  // same call keeps the contact tidy and makes a repeat delivery a no-op.
  const promoted = await eo(path, {
    method: "PUT",
    body: { tags: { [TAG]: true, [PENDING_TAG]: false } },
  });
  if (!promoted.ok) {
    console.error(`eo-webhook: could not tag ${contactId}: ${promoted.status}`);
    return;
  }

  console.log(`eo-webhook: sent the Quick Start to ${contactId}`);
}

function isFromEmailOctopus(raw, header, secret) {
  if (!header) return false;
  const expected = "sha256=" + createHmac("sha256", secret).update(raw, "utf8").digest("hex");
  const sent = Buffer.from(header.trim(), "utf8");
  const mine = Buffer.from(expected, "utf8");
  // timingSafeEqual throws on a length mismatch, so check that first.
  return sent.length === mine.length && timingSafeEqual(sent, mine);
}
