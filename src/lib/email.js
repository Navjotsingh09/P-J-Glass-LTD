import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'P&J Glass <orders@pj-glass.co.uk>';
const SHOP_EMAIL = process.env.SHOP_NOTIFICATION_EMAIL || 'info@pj-glass.co.uk';

function formatCurrency(amount) {
  return `£${Number(amount).toFixed(2)}`;
}

function itemsTableHtml(items) {
  const rows = items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;">${item.name}${item.size ? ` — ${item.size}` : ''}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(item.price * item.quantity)}</td>
        </tr>`
    )
    .join('');
  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <thead>
        <tr style="background:#f4f4f5;">
          <th style="padding:8px 12px;text-align:left;">Item</th>
          <th style="padding:8px 12px;text-align:center;">Qty</th>
          <th style="padding:8px 12px;text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function baseTemplate(content) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;">
        <!-- Header -->
        <div style="background:#0f172a;padding:24px 32px;">
          <h1 style="color:#ffffff;font-size:20px;margin:0;">P&amp;J Glass</h1>
          <p style="color:#5ec4d4;font-size:13px;margin:4px 0 0;">Premium Glass Solutions</p>
        </div>
        <!-- Body -->
        <div style="padding:32px;">
          ${content}
        </div>
        <!-- Footer -->
        <div style="background:#f4f4f5;padding:24px 32px;text-align:center;font-size:12px;color:#6b7280;">
          <p style="margin:0;">P&amp;J Glass Ltd &bull; 020 8599 1622 &bull; info@pj-glass.co.uk</p>
          <p style="margin:8px 0 0;">Unit 3, Ilford, Essex, IG1 2AH</p>
        </div>
      </div>
    </body>
    </html>`;
}

// ─── Order Confirmation (to customer) ────────────────────────

export async function sendOrderConfirmation(order) {
  const html = baseTemplate(`
    <h2 style="color:#0f172a;margin:0 0 8px;">Order Confirmed!</h2>
    <p style="color:#6b7280;margin:0 0 24px;">Thank you for your order, ${order.customer_name}.</p>

    <div style="background:#f0fdfa;border:1px solid #5ec4d4;border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;color:#0f172a;"><strong>Order Number:</strong> ${order.order_number}</p>
    </div>

    ${itemsTableHtml(order.items)}

    <div style="text-align:right;margin-top:16px;">
      <p style="margin:4px 0;color:#6b7280;">Subtotal: ${formatCurrency(order.subtotal)}</p>
      <p style="margin:4px 0;color:#6b7280;">Delivery: ${order.delivery_cost > 0 ? formatCurrency(order.delivery_cost) : 'FREE'}</p>
      <p style="margin:8px 0 0;font-size:18px;color:#0f172a;"><strong>Total: ${formatCurrency(order.grand_total)}</strong></p>
    </div>

    <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

    <h3 style="color:#0f172a;margin:0 0 8px;">Delivery Details</h3>
    <p style="color:#6b7280;margin:0;line-height:1.6;">
      ${order.customer_name}<br>
      ${order.address ? `${order.address}<br>` : ''}
      ${order.city ? `${order.city}<br>` : ''}
      ${order.postcode || ''}
    </p>

    <div style="margin-top:24px;text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/track?order=${order.order_number}" 
         style="display:inline-block;background:#5ec4d4;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;">
        Track Your Order
      </a>
    </div>

    <p style="color:#6b7280;font-size:13px;margin:24px 0 0;text-align:center;">
      Questions? Call us at 020 8599 1622 or reply to this email.
    </p>
  `);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `Order Confirmed — ${order.order_number}`,
      html,
    });
  } catch (err) {
    console.error('Failed to send order confirmation email:', err);
  }
}

// ─── New Order Alert (to shop staff) ─────────────────────────

export async function sendNewOrderAlert(order) {
  const html = baseTemplate(`
    <h2 style="color:#0f172a;margin:0 0 8px;">🛒 New Order Received</h2>
    <p style="color:#6b7280;margin:0 0 24px;">A new order has been placed and paid for.</p>

    <div style="background:#fef3c7;border:1px solid #f59e0b;border-radius:8px;padding:16px;margin-bottom:24px;">
      <p style="margin:0;font-size:14px;color:#0f172a;">
        <strong>Order:</strong> ${order.order_number} &bull;
        <strong>Total:</strong> ${formatCurrency(order.grand_total)}
      </p>
    </div>

    <h3 style="color:#0f172a;margin:0 0 8px;">Customer</h3>
    <p style="color:#6b7280;margin:0 0 16px;line-height:1.6;">
      ${order.customer_name}<br>
      ${order.customer_email}<br>
      ${order.customer_phone ? `${order.customer_phone}<br>` : ''}
      ${order.address ? `${order.address}, ` : ''}${order.city || ''} ${order.postcode || ''}
    </p>

    ${itemsTableHtml(order.items)}

    <div style="text-align:right;margin-top:16px;">
      <p style="margin:4px 0;color:#6b7280;">Subtotal: ${formatCurrency(order.subtotal)}</p>
      <p style="margin:4px 0;color:#6b7280;">Delivery (${order.delivery_zone || 'N/A'}): ${formatCurrency(order.delivery_cost)}</p>
      <p style="margin:8px 0 0;font-size:18px;color:#0f172a;"><strong>Total: ${formatCurrency(order.grand_total)}</strong></p>
    </div>

    ${order.notes ? `<div style="margin-top:16px;padding:12px;background:#f4f4f5;border-radius:6px;"><strong>Customer Notes:</strong> ${order.notes}</div>` : ''}

    <div style="margin-top:24px;text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin" 
         style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;">
        View in Dashboard
      </a>
    </div>
  `);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: SHOP_EMAIL,
      subject: `New Order ${order.order_number} — ${formatCurrency(order.grand_total)}`,
      html,
    });
  } catch (err) {
    console.error('Failed to send new order alert:', err);
  }
}

// ─── Status Update (to customer) ────────────────────────────

const STATUS_MESSAGES = {
  processing: { title: 'Order Being Prepared', desc: 'We\'re preparing your glass order for dispatch.' },
  shipped: { title: 'Order Shipped! 🚚', desc: 'Your order is on its way.' },
  delivered: { title: 'Order Delivered ✅', desc: 'Your order has been delivered.' },
  cancelled: { title: 'Order Cancelled', desc: 'Your order has been cancelled.' },
  refunded: { title: 'Refund Processed', desc: 'A refund has been issued for your order.' },
};

export async function sendStatusUpdate(order, newStatus) {
  const msg = STATUS_MESSAGES[newStatus];
  if (!msg) return; // Don't email for pending/paid transitions

  const trackingBlock =
    newStatus === 'shipped' && order.tracking_number
      ? `<div style="background:#f0fdfa;border:1px solid #5ec4d4;border-radius:8px;padding:16px;margin:16px 0;">
           <p style="margin:0;font-size:14px;"><strong>Tracking Number:</strong> ${order.tracking_number}</p>
           ${order.tracking_url ? `<p style="margin:8px 0 0;"><a href="${order.tracking_url}" style="color:#5ec4d4;">Track Package →</a></p>` : ''}
         </div>`
      : '';

  const html = baseTemplate(`
    <h2 style="color:#0f172a;margin:0 0 8px;">${msg.title}</h2>
    <p style="color:#6b7280;margin:0 0 24px;">${msg.desc}</p>

    <div style="background:#f4f4f5;border-radius:8px;padding:16px;margin-bottom:16px;">
      <p style="margin:0;font-size:14px;color:#0f172a;">
        <strong>Order:</strong> ${order.order_number} &bull;
        <strong>Status:</strong> <span style="color:#5ec4d4;">${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}</span>
      </p>
    </div>

    ${trackingBlock}

    <div style="margin-top:24px;text-align:center;">
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/track?order=${order.order_number}" 
         style="display:inline-block;background:#5ec4d4;color:#ffffff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:600;">
        Track Your Order
      </a>
    </div>

    <p style="color:#6b7280;font-size:13px;margin:24px 0 0;text-align:center;">
      Questions? Call us at 020 8599 1622 or reply to this email.
    </p>
  `);

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: order.customer_email,
      subject: `${msg.title} — ${order.order_number}`,
      html,
    });
  } catch (err) {
    console.error('Failed to send status update email:', err);
  }
}
