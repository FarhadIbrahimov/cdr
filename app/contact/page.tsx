"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [callbackNumber, setCallbackNumber] = useState("");
  const [bestDay, setBestDay] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const hasMessage = details.trim().length >= 5;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hasMessage || isSubmitting) return;

    const message = [
      "Consultation Request",
      `Name: ${name.trim() || "Not provided"}`,
      `Email: ${email.trim() || "Not provided"}`,
      `Callback Number: ${callbackNumber.trim() || "Not provided"}`,
      `Best Day: ${bestDay || "Not provided"}`,
      `Best Time: ${bestTime || "Not provided"}`,
      "",
      "Project Details:",
      details.trim(),
    ].join("\n");

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
          contact: email.trim() || callbackNumber.trim(),
          message,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(payload?.error || "Failed to submit consult request");
      }

      setName("");
      setEmail("");
      setCallbackNumber("");
      setBestDay("");
      setBestTime("");
      setDetails("");
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
    <div className="site-shell">
      <main className="consult-main">
        <section className="consult-hero">
          <p className="eyebrow">Contact Us</p>
          <h1>Book Your Consultation</h1>
          <p className="consult-text">
            Call <a href="tel:+17204496824">(720) 449-6824</a> or email{" "}
            <a className="contact-link" href="mailto:denvercustomremodeling@gmail.com">
              denvercustomremodeling@gmail.com
            </a>
            .
          </p>
          <Link className="button button-secondary" href="/">
            Back to Home
          </Link>
        </section>

        <section className="consult-form-wrap">
          <h2>Tell Us About Your Project</h2>
          <form className="consult-form" onSubmit={onSubmit}>
            <div className="consult-grid">
              <label>
                Full Name
                <input
                  className="chat-field"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="John Doe"
                />
              </label>

              <label>
                Email
                <input
                  className="chat-field"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label>
                Callback Number
                <input
                  className="chat-field"
                  value={callbackNumber}
                  onChange={(event) => setCallbackNumber(event.target.value)}
                  placeholder="(720) 000-0000"
                />
              </label>

              <label>
                Best Day to Call
                <select
                  className="chat-field"
                  value={bestDay}
                  onChange={(event) => setBestDay(event.target.value)}
                >
                  <option value="">Select a day</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </label>

              <label>
                Best Time to Call
                <select
                  className="chat-field"
                  value={bestTime}
                  onChange={(event) => setBestTime(event.target.value)}
                >
                  <option value="">Select a time</option>
                  <option>Morning (8am - 12pm)</option>
                  <option>Afternoon (12pm - 4pm)</option>
                  <option>Evening (4pm - 7pm)</option>
                </select>
              </label>
            </div>

            <label>
              Project Details
              <textarea
                className="chat-input"
                rows={6}
                value={details}
                onChange={(event) => setDetails(event.target.value)}
                placeholder="Tell us about your remodel goals, budget range, timeline, and anything else we should know."
              />
            </label>

            <div className="consult-actions">
              <button type="submit" className="button" disabled={!hasMessage || isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </div>

            {status === "success" ? (
              <p className="chat-status chat-status-success">
                Request sent. We will contact you soon.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="chat-status chat-status-error">
                {errorMessage || "Message could not be sent. Please try again."}
              </p>
            ) : null}
          </form>
        </section>
      </main>
    </div>
  );
}
