// Final Light Quick Start signup. Progressive enhancement only: without this
// file the form still posts natively to /api/subscribe and gets an HTML reply.
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".fl-signup");
  if (!form) return;

  const field = form.querySelector(".fl-signup__field");
  const submit = form.querySelector(".fl-signup__submit");
  const status = form.querySelector(".fl-signup__status");
  const submitLabel = submit ? submit.textContent : "";

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
    if (result.pending) {
      return "Almost there - check your inbox for a confirmation email. The Quick Start follows once you've confirmed.";
    }
    if (result.state === "tagged") {
      return "You're already on the list - the Quick Start is on its way.";
    }
    return "You're on the list. The Quick Start is on its way.";
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
});
