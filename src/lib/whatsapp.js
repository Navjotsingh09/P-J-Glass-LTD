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

async function sendViaCallMeBot(message) {
  const phone = process.env.CALLMEBOT_PHONE;
  const apiKey = process.env.CALLMEBOT_API_KEY;

  if (!phone || !apiKey) {
    return false;
  }

  const url = new URL('https://api.callmebot.com/whatsapp.php');
  url.searchParams.set('phone', phone);
  url.searchParams.set('text', message);
  url.searchParams.set('apikey', apiKey);

  const response = await fetch(url.toString(), { method: 'GET' });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`CallMeBot WhatsApp send failed (${response.status}): ${errorText}`);
  }

  return true;
}

async function sendViaTwilio(message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = process.env.TWILIO_WHATSAPP_TO;

  if (!accountSid || !authToken || !from || !to) {
    return false;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const form = new URLSearchParams();
  form.set('From', from);
  form.set('To', to);
  form.set('Body', message);

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

  return true;
}

export async function sendOrderWhatsAppCopy(order) {
  const message = buildOrderMessage(order);

  // Prefer free provider first; fall back to Twilio when configured.
  const sentViaFree = await sendViaCallMeBot(message);
  if (sentViaFree) {
    return;
  }

  const sentViaTwilio = await sendViaTwilio(message);
  if (sentViaTwilio) {
    return;
  }

  console.warn('WhatsApp carbon copy skipped: no provider env vars are configured.');
}
