import { NextResponse } from "next/server";
import { sendChatEmail } from "@/lib/chat";

type ChatRequest = {
  name?: string;
  contact?: string;
  message?: string;
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export async function POST(request: Request) {
  let body: ChatRequest;

  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 },
    );
  }

  const message = isString(body.message) ? body.message.trim() : "";
  const name = isString(body.name) ? body.name.trim() : "";
  const contact = isString(body.contact) ? body.contact.trim() : "";

  if (message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Message must be at least 5 characters." },
      { status: 400 },
    );
  }

  if (message.length > 3000 || name.length > 100 || contact.length > 160) {
    return NextResponse.json(
      { ok: false, error: "Submitted message is too long." },
      { status: 400 },
    );
  }

  const result = await sendChatEmail({
    name,
    contact,
    message,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error || "Unable to deliver message." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
