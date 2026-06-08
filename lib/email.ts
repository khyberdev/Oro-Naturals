interface OrderEmailItem {
  name: string;
  quantity: number;
  lineTotalPkr: number;
}

interface OrderEmailData {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
  country: string;
  paymentMethod: string;
  items: OrderEmailItem[];
  subtotalPkr: number;
  shippingPkr: number;
  totalPkr: number;
}

const rs = (n: number) => `Rs. ${new Intl.NumberFormat("en-PK").format(n)}`;

const PAYMENT_LABELS: Record<string, string> = {
  cod: "Cash on Delivery",
  bank: "Bank Transfer",
  card: "Card",
};

function buildHtml(order: OrderEmailData): string {
  const rows = order.items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0;">${i.name} × ${i.quantity}</td><td style="padding:6px 0;text-align:right;">${rs(i.lineTotalPkr)}</td></tr>`,
    )
    .join("");

  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#2b2b2b;">
    <h2 style="color:#2c3a30;">New Order · ${order.orderId}</h2>
    <p><strong>Payment:</strong> ${PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}</p>
    <h3 style="color:#2c3a30;margin-bottom:4px;">Customer</h3>
    <p style="margin:0;">${order.customerName}<br/>${order.email}<br/>${order.phone}</p>
    <h3 style="color:#2c3a30;margin-bottom:4px;">Ship To</h3>
    <p style="margin:0;">${order.address}, ${order.city}${order.postalCode ? `, ${order.postalCode}` : ""}<br/>${order.country}</p>
    <h3 style="color:#2c3a30;margin-bottom:4px;">Items</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${rows}
      <tr><td style="padding:6px 0;border-top:1px solid #ddd;">Subtotal</td><td style="padding:6px 0;border-top:1px solid #ddd;text-align:right;">${rs(order.subtotalPkr)}</td></tr>
      <tr><td style="padding:6px 0;">Shipping</td><td style="padding:6px 0;text-align:right;">${order.shippingPkr === 0 ? "Free" : rs(order.shippingPkr)}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Total</td><td style="padding:6px 0;text-align:right;font-weight:bold;">${rs(order.totalPkr)}</td></tr>
    </table>
  </div>`;
}

/**
 * Sends an order-notification email via Resend's REST API.
 * No-ops (returns false) if RESEND_API_KEY / ORDER_NOTIFICATION_EMAIL are unset,
 * so checkout never fails just because email isn't configured.
 */
export async function sendOrderNotification(
  order: OrderEmailData,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  const from = process.env.ORDER_FROM_EMAIL || "Oro Naturals <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn(
      "[email] Skipping order notification — RESEND_API_KEY or ORDER_NOTIFICATION_EMAIL not set.",
    );
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: order.email,
        subject: `New Order ${order.orderId} · ${order.customerName}`,
        html: buildHtml(order),
      }),
    });

    if (!res.ok) {
      console.error("[email] Resend responded with", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] Failed to send order notification:", err);
    return false;
  }
}
