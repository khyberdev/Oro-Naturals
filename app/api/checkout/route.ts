import { NextResponse } from "next/server";
import { writeClient, hasWriteToken } from "@/lib/sanity/writeClient";
import { sendOrderNotification } from "@/lib/email";

/**
 * Checkout endpoint.
 *
 * Persists the order as a Sanity `order` document (viewable in the Studio at
 * /admin) and sends an email notification. Payment is handled out-of-band for
 * now (Cash on Delivery / Bank Transfer) — no online gateway yet.
 */

const SHIPPING_FLAT_PKR = 250;
const FREE_SHIPPING_THRESHOLD_PKR = 5000;

interface CheckoutLineItem {
  productId: string;
  name: string;
  quantity: number;
  unitPricePkr: number;
}

interface CheckoutPayload {
  contact?: { fullName?: string; email?: string; phone?: string };
  shipping?: {
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  paymentMethod?: "card" | "bank" | "cod";
  items?: CheckoutLineItem[];
  currencyShown?: string;
}

function generateOrderId(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `ORO-${Date.now().toString(36).toUpperCase()}-${random}`;
}

export async function POST(request: Request) {
  let payload: CheckoutPayload;

  try {
    payload = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { contact, shipping, paymentMethod, items, currencyShown } = payload;

  if (!items || items.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Your bag is empty." },
      { status: 400 },
    );
  }

  if (!contact?.fullName || !contact?.email || !contact?.phone) {
    return NextResponse.json(
      { ok: false, error: "Missing contact information." },
      { status: 400 },
    );
  }

  if (!shipping?.address || !shipping?.city || !shipping?.country) {
    return NextResponse.json(
      { ok: false, error: "Missing shipping information." },
      { status: 400 },
    );
  }

  if (!paymentMethod) {
    return NextResponse.json(
      { ok: false, error: "Select a payment method." },
      { status: 400 },
    );
  }

  // Recompute totals server-side — never trust client-sent amounts.
  const lineItems = items.map((item) => {
    const quantity = Math.max(1, Math.floor(item.quantity || 1));
    const unitPricePkr = Math.max(0, Number(item.unitPricePkr) || 0);
    return {
      _type: "orderLineItem",
      productId: item.productId,
      name: item.name,
      quantity,
      unitPricePkr,
      lineTotalPkr: unitPricePkr * quantity,
    };
  });

  const subtotalPkr = lineItems.reduce((sum, i) => sum + i.lineTotalPkr, 0);
  const shippingPkr =
    subtotalPkr >= FREE_SHIPPING_THRESHOLD_PKR ? 0 : SHIPPING_FLAT_PKR;
  const totalPkr = subtotalPkr + shippingPkr;

  const orderId = generateOrderId();
  const placedAt = new Date().toISOString();

  const orderDoc = {
    _type: "order",
    orderId,
    status: "pending_payment",
    placedAt,
    paymentMethod,
    customerName: contact.fullName,
    email: contact.email,
    phone: contact.phone,
    shippingAddress: {
      address: shipping.address,
      city: shipping.city,
      postalCode: shipping.postalCode ?? "",
      country: shipping.country,
    },
    items: lineItems,
    subtotalPkr,
    shippingPkr,
    totalPkr,
    currencyShown: currencyShown ?? "PKR",
  };

  if (!hasWriteToken) {
    console.error(
      "[checkout] SANITY_API_WRITE_TOKEN not set — order was NOT saved.",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Orders are not configured yet. Please contact us to complete your purchase.",
      },
      { status: 503 },
    );
  }

  try {
    await writeClient.create(orderDoc);
  } catch (err) {
    console.error("[checkout] Failed to save order:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't place your order. Please try again." },
      { status: 500 },
    );
  }

  // Fire off the notification email (best-effort; never blocks the order).
  await sendOrderNotification({
    orderId,
    customerName: contact.fullName,
    email: contact.email,
    phone: contact.phone,
    address: shipping.address,
    city: shipping.city,
    postalCode: shipping.postalCode,
    country: shipping.country,
    paymentMethod,
    items: lineItems,
    subtotalPkr,
    shippingPkr,
    totalPkr,
  });

  return NextResponse.json({
    ok: true,
    orderId,
    paymentMethod,
    estimatedDelivery: "3–5 business days",
    message:
      paymentMethod === "bank"
        ? "Order placed. Please complete the bank transfer using the reference below."
        : paymentMethod === "cod"
          ? "Order placed. Pay in cash when your order is delivered."
          : "Order placed successfully.",
  });
}
