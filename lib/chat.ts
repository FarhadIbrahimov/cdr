type ChatPayload = {
  name?: string;
  contact?: string;
  message: string;
};

function normalize(value?: string) {
  return value?.trim() ?? "";
}

function toTextBody(payload: ChatPayload) {
  const sentAt = new Date().toISOString();
  return [
    "New website chat message",
    "",
    `Sent at: ${sentAt}`,
    `Name: ${normalize(payload.name) || "Not provided"}`,
    `Contact: ${normalize(payload.contact) || "Not provided"}`,
    "",
    "Message:",
    normalize(payload.message),
  ].join("\n");
}

export async function sendChatEmail(payload: ChatPayload) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      error:
        "Missing RESEND_API_KEY. Add it to your environment configuration.",
    };
  }

  const to = process.env.CHAT_TO_EMAIL || "denvercustomremodeling@gmail.com";
  const from = process.env.CHAT_FROM_EMAIL || "onboarding@resend.dev";
  const subject = "New website chat message";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text: toTextBody(payload),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    return {
      ok: false,
      error: `Email provider returned ${response.status}: ${details}`,
    };
  }

  return { ok: true };
}
