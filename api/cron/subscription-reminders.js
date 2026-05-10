// ============================================================================
// api/cron/subscription-reminders.js
// Vercel cron — runs daily at 8AM WAT (7AM UTC)
// Sends expiry reminders and we-miss-you emails
// ============================================================================

import { sheetsGet } from '../_helpers/sheets.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.FROM_EMAIL;

const PLAN_NAMES = {
  monthly: 'Premium Monthly',
  annual:  'Premium Annual',
  pro:     'Pro Monthly',
};

const PLAN_AMOUNTS = {
  monthly: '₦9,000',
  annual:  '₦89,000',
  pro:     '₦3,000',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

// ── EMAIL: 3-day expiry reminder ─────────────────────────────────────────────
function expiryReminderEmail({ firstName, plan, expiresAt }) {
  const expiryFormatted = formatDate(expiresAt);
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:520px;background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2a2a4a;">
      <tr>
        <td style="background:linear-gradient(135deg,#7a4500,#c47000,#7a4500);padding:32px 40px;text-align:center;">
          <div style="font-size:48px;margin-bottom:8px;">⏳</div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Your Premium ends in 3 days</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">EliteScholars · Renewal Reminder</p>
        </td>
      </tr>
      <tr>
        <td style="padding:40px 40px 32px;">
          <h2 style="margin:0 0 6px;color:#fff;font-size:18px;">Hey ${firstName} ⏰</h2>
          <p style="margin:0 0 24px;color:#9090b0;font-size:14px;line-height:1.7;">
            Your <strong style="color:#c8b4f0;">${PLAN_NAMES[plan] || plan}</strong> subscription expires on
            <strong style="color:#ffbd2e;">${expiryFormatted}</strong>. That's just 3 days away.
            Don't let your streak and progress lose momentum now — you've come too far!
          </p>
          <div style="background:#0f0f1a;border:1px solid #c47000;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
            <p style="margin:0 0 6px;color:#9090b0;font-size:12px;">Your subscription expires</p>
            <p style="margin:0;color:#ffbd2e;font-size:24px;font-weight:700;">${expiryFormatted}</p>
          </div>
          <div style="background:rgba(255,95,87,0.06);border:1px solid rgba(255,95,87,0.2);border-radius:10px;padding:18px 20px;margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#ff5f57;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">What you will lose after expiry</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">❌ Unlimited CBT sessions — gone</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">❌ Learn mode access — locked</p>
            <p style="margin:0 0 8px;color:#c8c8c8;font-size:13px;">❌ Game mode — restricted</p>
            <p style="margin:0;color:#c8c8c8;font-size:13px;">❌ Leaderboard and challenges — limited</p>
          </div>
          <div style="text-align:center;margin-bottom:24px;">
            <a href="https://elitescholars.site" style="display:inline-block;background:linear-gradient(135deg,#4B0082,#7B2FBE);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
              Renew Now →
            </a>
          </div>
          <p style="margin:0;color:#5a5a7a;font-size:12px;line-height:1.7;">
            Renewing takes less than 2 minutes. Keep the momentum going, ${firstName} — your exams won't wait.
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#13132a;padding:20px 40px;text-align:center;border-top:1px solid #2a2a4a;">
          <p style="margin:0 0 4px;color:#5a5a7a;font-size:11px;">© 2026 EliteScholars · Built for Nigerian Students</p>
          <p style="margin:0;color:#3a3a5a;font-size:10px;">JAMB · WAEC · NECO · POST UTME · GST</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ── EMAIL: We miss you (expired) ─────────────────────────────────────────────
function missYouEmail({ firstName, plan }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f1a;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:520px;background:#1a1a2e;border-radius:16px;overflow:hidden;border:1px solid #2a2a4a;">
      <tr>
        <td style="background:linear-gradient(135deg,#1a0030,#4B0082,#1a0030);padding:32px 40px;text-align:center;">
          <div style="font-size:52px;margin-bottom:8px;">🥺</div>
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">We miss you, ${firstName}</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">EliteScholars · Come Back</p>
        </td>
      </tr>
      <tr>
        <td style="padding:40px 40px 32px;">
          <p style="margin:0 0 20px;color:#c8c8c8;font-size:15px;line-height:1.8;">
            Hey <strong style="color:#c8b4f0;">${firstName}</strong> 🥺
          </p>
          <p style="margin:0 0 20px;color:#9090b0;font-size:14px;line-height:1.8;">
            Your Premium subscription has expired and honestly... EliteScholars hasn't been the same without you.
            Your study streak, your scores, your progress — it's all still here, waiting for you to come back.
          </p>
          <p style="margin:0 0 28px;color:#9090b0;font-size:14px;line-height:1.8;">
            Your exam won't prepare itself. And you were so close 💪
          </p>
          <div style="background:#0f0f1a;border:1px solid #2a2a4a;border-radius:12px;padding:20px;margin-bottom:24px;">
            <p style="margin:0 0 14px;color:#c8b4f0;font-size:13px;font-weight:600;">Here's what you're missing right now 😔</p>
            <p style="margin:0 0 10px;color:#9090b0;font-size:13px;">📚 <strong style="color:#c8c8c8;">Unlimited CBT Practice</strong> — practice as many times as you need without limits</p>
            <p style="margin:0 0 10px;color:#9090b0;font-size:13px;">🧠 <strong style="color:#c8c8c8;">Full Learn Mode</strong> — master every topic before your exam</p>
            <p style="margin:0 0 10px;color:#9090b0;font-size:13px;">🎮 <strong style="color:#c8c8c8;">Game Mode</strong> — make studying actually fun</p>
            <p style="margin:0 0 10px;color:#9090b0;font-size:13px;">🏆 <strong style="color:#c8c8c8;">Leaderboard</strong> — compete with students across Nigeria</p>
            <p style="margin:0;color:#9090b0;font-size:13px;">⚡ <strong style="color:#c8c8c8;">Challenges</strong> — push yourself further every day</p>
          </div>
          <div style="background:linear-gradient(135deg,rgba(75,0,130,0.3),rgba(123,47,190,0.3));border:1px solid #4B0082;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;">
            <p style="margin:0 0 6px;color:#c8b4f0;font-size:14px;line-height:1.6;">
              Your exam is coming. Every day without practice is a day your competition gets ahead.
            </p>
            <p style="margin:0 0 16px;color:#9090b0;font-size:13px;">Come back. We've got you. 🙏</p>
            <a href="https://elitescholars.site" style="display:inline-block;background:linear-gradient(135deg,#4B0082,#7B2FBE);color:#fff;text-decoration:none;padding:14px 36px;border-radius:8px;font-size:15px;font-weight:600;">
              Renew My Premium 🚀
            </a>
          </div>
          <div style="background:#0f0f1a;border:1px solid #2a2a4a;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 12px;color:#5a5a7a;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Available Plans</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;"><span style="color:#c8c8c8;font-size:13px;">⭐ Pro Monthly</span></td>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;text-align:right;"><span style="color:#28c840;font-size:13px;font-weight:600;">₦3,000/mo</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;"><span style="color:#c8c8c8;font-size:13px;">💎 Premium Monthly</span></td>
                <td style="padding:8px 0;border-bottom:1px solid #1e1e3a;text-align:right;"><span style="color:#28c840;font-size:13px;font-weight:600;">₦9,000/mo</span></td>
              </tr>
              <tr>
                <td style="padding:8px 0;"><span style="color:#c8c8c8;font-size:13px;">👑 Premium Annual</span></td>
                <td style="padding:8px 0;text-align:right;"><span style="color:#28c840;font-size:13px;font-weight:600;">₦89,000/yr</span></td>
              </tr>
            </table>
          </div>
          <p style="margin:0;color:#5a5a7a;font-size:12px;line-height:1.7;text-align:center;">
            We believe in you, ${firstName}. Come back and show your exams what you're made of 💜
          </p>
        </td>
      </tr>
      <tr>
        <td style="background:#13132a;padding:20px 40px;text-align:center;border-top:1px solid #2a2a4a;">
          <p style="margin:0 0 4px;color:#5a5a7a;font-size:11px;">© 2026 EliteScholars · Built for Nigerian Students</p>
          <p style="margin:0;color:#3a3a5a;font-size:10px;">JAMB · WAEC · NECO · POST UTME · GST</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export default async function handler(req, res) {
  // Vercel cron sends GET with a secret header
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await sheetsGet({ action: 'getExpiringSubscriptions' });

    if (!result?.success) {
      return res.status(500).json({ error: 'Failed to fetch subscriptions' });
    }

    const { expiring = [], expired = [] } = result;
    const sent = { reminders: 0, missYou: 0, errors: 0 };

    // ── Send 3-day expiry reminders ───────────────────────────────────────────
    for (const user of expiring) {
      try {
        await resend.emails.send({
          from:    `EliteScholars <${FROM}>`,
          to:      user.email,
          subject: `⏳ ${user.firstName}, your Premium expires in 3 days`,
          html:    expiryReminderEmail({
            firstName: user.firstName || 'Student',
            plan:      user.plan,
            expiresAt: user.expiresAt,
          }),
        });
        sent.reminders++;
        console.log('Reminder sent to:', user.email);
      } catch (err) {
        console.error('Reminder email error:', user.email, err.message);
        sent.errors++;
      }
    }

    // ── Send we-miss-you to expired users ─────────────────────────────────────
    for (const user of expired) {
      try {
        await resend.emails.send({
          from:    `EliteScholars <${FROM}>`,
          to:      user.email,
          subject: `🥺 ${user.firstName}, we miss you — come back to EliteScholars`,
          html:    missYouEmail({
            firstName: user.firstName || 'Student',
            plan:      user.plan,
          }),
        });
        sent.missYou++;
        console.log('Miss-you sent to:', user.email);
      } catch (err) {
        console.error('Miss-you email error:', user.email, err.message);
        sent.errors++;
      }
    }

    return res.status(200).json({
      success: true,
      sent,
      expiring: expiring.length,
      expired:  expired.length,
    });

  } catch (err) {
    console.error('Cron handler crash:', err.message);
    return res.status(500).json({ error: err.message });
  }
}