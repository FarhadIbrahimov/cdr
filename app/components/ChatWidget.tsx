"use client";

import { FormEvent, useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const hasMessage = message.trim().length > 0;

  function resetForm() {
    setMessage("");
    setName("");
    setContact("");
    setStatus("idle");
    setErrorMessage("");
    setIsSubmitting(false);
  }

  function closeChat() {
    setOpen(false);
    resetForm();
  }

  function toggleChat() {
    setOpen((value) => {
      if (value) {
        resetForm();
      }
      return !value;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasMessage || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setStatus("idle");
      setErrorMessage("");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          contact: contact.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "Message failed");
      }

      setMessage("");
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Message could not be sent.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="chat-widget">
      {open ? (
        <section className="chat-panel" aria-label="Chat window">
          <div className="chat-header">
            <p>Chat With Denver Custom Remodeling</p>
            <button
              type="button"
              className="chat-close"
              onClick={closeChat}
              aria-label="Close chat"
            >
              x
            </button>
          </div>
          <p className="chat-hint">
            Send a message and we will reply by email or phone.
          </p>
          <form onSubmit={onSubmit}>
            <div className="chat-input-group">
              <input
                className="chat-field"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name (optional)"
              />
              <input
                className="chat-field"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                placeholder="Email or phone (optional)"
              />
            </div>
            <textarea
              className="chat-input"
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Hi, I need a quote for a bathroom remodel..."
            />
            <div className="chat-actions">
              <button
                type="submit"
                className="button"
                disabled={!hasMessage || isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
            {status === "success" ? (
              <p className="chat-status chat-status-success">
                Message sent. We will get back to you soon.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="chat-status chat-status-error">
                {errorMessage || "Message could not be sent. Please try again."}
              </p>
            ) : null}
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="chat-launcher"
        onClick={toggleChat}
        aria-label="Open chat"
      >
        Chat
      </button>
    </div>
  );
}
