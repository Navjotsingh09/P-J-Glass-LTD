function formatCurrency(amount) {
  return `£${Number(amount).toFixed(2)}`;
}

function buildOrderMessage(order) {
  const itemCount = Array.isArray(order.items)
    ? order.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
    : 0;

  return [
    'New Order Placed',
    `Order: ${order.order_number || order.id}`,
    `Customer: ${order.customer_name}`,
    `Email: ${order.customer_email}`,
    order.customer_phone ? `Phone: ${order.customer_phone}` : null,
    `Items: ${itemCount}`,
    `Total: ${formatCurrency(order.grand_total)}`,
    order.delivery_zone ? `Delivery Zone: ${order.delivery_zone}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function sendOrderWhatsAppCopy(order) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.TWILIO_WHATSAPP_TO;

  // Graceful fallback if WhatsApp is not configured yet.
  if (!accountSid || !authToken || !from || !to) {
    console.warn('WhatsApp carbon copy skipped: Twilio WhatsApp env vars are missing.');
    return;
  }

  const body = buildOrderMessage(order);
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const form = new URLSearchParams();
  form.set('From', from);
  form.set('To', to);
  form.set('Body', body);

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio WhatsApp send failed (${response.status}): ${errorText}`);
  }
}
