import { NextResponse } from "next/server";

const GAS_WEBAPP_URL = process.env.GAS_WEBAPP_URL!;
if (!GAS_WEBAPP_URL) {
  console.warn("Missing GAS_WEBAPP_URL env var");
}

export const runtime = "nodejs"; 

// CORS (adjust origins as needed)
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN ?? "*";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOW_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

type Product = {
  productId: string | number;
  quantity: string | number;
  productName: string;
  productImage?: string;
  orderId?: string;
};

type OrderPayload = {
  userId?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  mail?: string;
  gouvernate?: string;
  city?: string;
  adress?: string;
  postalCode?: string;
  // multiple order lines
  products: Product[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<OrderPayload>;

    // Minimal validation
    if (!body?.products || !Array.isArray(body.products) || body.products.length === 0) {
      return json({ ok: false, error: "products[] is required" }, 400);
    }

    // Forward JSON straight to GAS web app
    const res = await fetch(GAS_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // If your GAS is restricted, add Auth here (Bearer, etc.)
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data?.ok === false) {
      return json(
        {
          ok: false,
          error:
            data?.error ??
            `GAS responded with ${res.status} ${res.statusText}`,
        },
        res.status || 500
      );
    }

    return json(
      {
        ok: true,
        ...data,
      },
      200
    );
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

function json(payload: Record<string, unknown> , status = 200) {
  return new NextResponse(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ALLOW_ORIGIN,
    },
  });
}
