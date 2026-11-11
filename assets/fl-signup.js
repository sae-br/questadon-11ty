// Final Light signup forms (.fl-signup): the Quick Start, and "notify me when
// it goes on sale". Progressive enhancement only: without this file each form
// still posts natively to /api/subscribe and gets an HTML reply.
//
// A form's data-interest says what it's for ("quickstart" when absent) and is
// sent to the server, which picks the EmailOctopus tag from it. Several forms
// can share a page, and the script can be included more than once safely.

// Success messages and the GA4 event name for each interest.
var FL_SIGNUP_INTERESTS = {
  quickstart: {
    event: "quickstart_signup",
    pending: "Almost there - check your inbox for a confirmation email. The Quick Start follows once you've confirmed.",
    tagged: "You're already on the list - the Quick Start is on its way.",
    created: "You're on the list. The Quick Start is on its way.",
  },
  release: {
    event: "release_notify_signup",
    pending: "Almost there - check your inbox for a confirmation email. Once you've confirmed, you'll hear from me when Final Light goes on sale.",
    tagged: "You're already on the list - I'll email you when Final Light goes on sale.",
    created: "You're on the list. I'll email you when Final Light goes on sale.",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".fl-signup").forEach(function (form) {
    // Bind once, even if the script tag appears twice on the page.
    if (form.dataset.flBound) return;
    form.dataset.flBound = "true";
    enhance(form);
  });
});

function enhance(form) {
  var interest = form.dataset.interest || "quickstart";
  var copy = FL_SIGNUP_INTERESTS[interest] || FL_SIGNUP_INTERESTS.quickstart;

  var field = form.querySelector(".fl-signup__field");
  var submit = form.querySelector(".fl-signup__submit");
  var status = form.querySelector(".fl-signup__status");
  var submitLabel = submit ? submit.textContent : "";

  function setStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("is-error", "is-success");
    if (kind) status.classList.add(kind);
  }

  function messageFor(result) {
    if (result.state === "unsubscribed") return result.message;
    if (result.state === "tagged" && result.pending) {
      return "You're already on the list but haven't confirmed yet - check your inbox for the confirmation email.";
    }
    if (result.pending) return copy.pending;
    if (result.state === "tagged") return copy.tagged;
    return copy.created;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Let the browser's own validation speak first.
    if (typeof form.reportValidity === "function" && !form.reportValidity()) return;

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Signing you up…";
    }
    setStatus("");

    fetch(form.action, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: field ? field.value : "",
        company: form.company ? form.company.value : "",
        interest: interest,
      }),
    })
      .then(function (response) {
        return response.json().then(function (body) {
          return { ok: response.ok, body: body };
        });
      })
      .then(function (result) {
        if (!result.ok || result.body.error) {
          setStatus(result.body.error || "Something went wrong. Please try again.", "is-error");
          return;
        }
        if (result.body.ok === false) {
          setStatus(messageFor(result.body), "is-error");
          return;
        }
        setStatus(messageFor(result.body), "is-success");

        // Conversion. Fires only on a genuine success - not on a validation
        // error, a rejected address or an unreachable server. `signup_state`
        // separates the three flavours of success so a confirmed subscriber
        // can be told apart from one who still owes us a double opt-in click:
        //   subscribed - on the list, confirmed
        //   pending    - added, waiting on the confirmation email
        //   tagged     - already subscribed, newly tagged
        // Each interest has its own event name (quickstart_signup,
        // release_notify_signup). Guarded because this file is plain JS that
        // could be loaded on a page without the analytics partial.
        if (typeof gtag === "function") {
          gtag("event", copy.event, {
            signup_state: result.body.pending
              ? "pending"
              : result.body.state === "tagged"
                ? "tagged"
                : "subscribed",
          });
        }

        form.reset();
      })
      .catch(function () {
        setStatus("Couldn't reach the server. Please try again.", "is-error");
      })
      .then(function () {
        if (submit) {
          submit.disabled = false;
          submit.textContent = submitLabel;
        }
      });
  });
}
