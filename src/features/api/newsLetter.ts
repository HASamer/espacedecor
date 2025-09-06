import { NextResponse } from "next/server";

const GAS_WEBAPP_URL = process.env.GAS_LETTERS_URL; 
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN ?? "*";

export const runtime = "nodejs"; // ensures full Node runtime (not edge)

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function POST(req: Request) {
  try {
    if (!GAS_WEBAPP_URL) {
      return json({ ok: false, error: "Server not configured (GAS_LETTERS_URL missing)" }, 500);
    }

    const { email } = (await req.json().catch(() => ({}))) as { email?: string };

    if (!email || !isValidEmail(email)) {
      return json({ ok: false, error: "Valid email is required" }, 400);
    }

    // forward JSON to GAS web app
    const res = await fetch(GAS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data?.ok === false) {
      return json(
        { ok: false, error: data?.error ?? `Upstream error: ${res.status} ${res.statusText}` },
        res.status || 500
      );
    }

    // GAS returns { ok: true, email, duplicate? }
    return json({ ok: true, ...data }, 200);
  } catch (err: unknown) {
  let message = "Unknown error";

  if (err instanceof Error) {
    message = err.message;
  } else if (typeof err === "string") {
    message = err;
  }

  return json({ ok: false, error: message }, 500);
}
}

/* ---------------- utils ---------------- */
function json(payload: Record<string, unknown>, status = 200) {
  return new NextResponse(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOW_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
}