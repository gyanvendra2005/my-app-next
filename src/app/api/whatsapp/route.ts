// app/api/whatsapp/route.ts
import { NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "sahaayak123";

/**
 * GET - Used by Meta (Facebook/WhatsApp) to verify your webhook URL
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified");
    return new Response(challenge || "ok", { status: 200 });
  }

  console.warn("❌ Verification failed");
  return new Response("Forbidden", { status: 403 });
}

/**
 * POST - Just log any incoming WhatsApp message payload
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Incoming WhatsApp webhook payload:", JSON.stringify(body, null, 2));

    return NextResponse.json({ status: "received" }, { status: 200 });
  } catch (err) {
    console.error("❌ Error parsing webhook body:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
