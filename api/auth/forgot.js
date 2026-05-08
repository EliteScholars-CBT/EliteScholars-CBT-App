// ============================================================================
// api/auth/forgot.js — POST /api/auth/forgot
// Rate limited: 3 requests per hour per email
// Sends reset code via Resend
// ============================================================================

import crypto from "crypto";
import { Resend } from "resend";

import { redis } from "../_helpers/redis.js";
import { checkRateLimit } from "../_helpers/rateLimit.js";
import { sheetsGet } from "../_helpers/sheets.js";

import {
  sendOk,
  sendErr,
  sendRateLimited,
  sendMethodNotAllowed,
  setCors
} from "../_helpers/response.js";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.FROM_EMAIL;

export default async function handler(req, res) {
  try {
    // =========================
    // CORS
    // =========================
    setCors(res);

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // =========================
    // METHOD CHECK
    // =========================
    if (req.method !== "POST") {
      return sendMethodNotAllowed(res);
    }

    // =========================
    // BODY
    // =========================
    const { email } = req.body || {};

    if (!email) {
      return sendErr(res, "Email required.");
    }

    const emailLower = email.toLowerCase().trim();

    // =========================
    // RATE LIMIT (per email)
    // =========================
    const rateKey = `forgot:${emailLower}`;

    const { allowed, retryAfter } = await checkRateLimit(
      rateKey,
      3,
      3600
    );

    if (!allowed) {
      return sendRateLimited(res, retryAfter);
    }

    // =========================
    // CHECK ACCOUNT EXISTS
    // (keep loginProfile action)
    // =========================
    let existing;

    try {
      existing = await sheetsGet({
        action: "loginProfile",
        email: emailLower,
        passwordHash: "__check_exists__"
      });
    } catch (err) {
      return sendErr(res, "Failed to verify account.");
    }

    // IMPORTANT FIX: match your actual contract (success OR profile-based existence)
    if (!existing?.success || !existing?.profile) {
      return sendErr(res, "No account found with this email.");
    }

    // =========================
    // GENERATE SECURE CODE
    // =========================
    const code = crypto.randomInt(100000, 1000000).toString();

    // =========================
    // STORE RESET CODE (Redis)
    // =========================
    try {
      await redis.set(
        `reset:${emailLower}`,
        JSON.stringify({
          code,
          attempts: 0
        }),
        { ex: 900 } // 15 minutes
      );
    } catch (err) {
      return sendErr(res, "Failed to store reset code.");
    }

    // =========================
    // SEND EMAIL
    // =========================
    try {
      await resend.emails.send({
        from: `EliteScholars <${FROM}>`,
        to: emailLower,
        subject: "Your EliteScholars Password Reset Code",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Code</title>
</head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:Segoe UI,Arial,sans-serif;">

  <table width="100%" style="padding:40px 16px;background:#0f0f1a;">
    <tr>
      <td align="center">

        <table width="100%" style="max-width:520px;background:#1a1a2e;border-radius:16px;border:1px solid #2a2a4a;overflow:hidden;">

          <!-- HEADER -->
          <tr>
            <td style="padding:32px;text-align:center;background:linear-gradient(135deg,#4B0082,#7B2FBE);">
              <h1 style="color:#fff;margin:0;font-size:22px;">EliteScholars</h1>
              <p style="color:rgba(255,255,255,0.6);margin:6px 0 0;font-size:12px;">
                Your Study / Exam Prep App
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:40px 32px;">

              <h2 style="color:#fff;margin:0 0 10px;">
                Password Reset Code
              </h2>

              <p style="color:#9090b0;font-size:14px;line-height:1.6;margin-bottom:24px;">
                Use the code below to reset your password. It expires in <b style="color:#c8b4f0;">15 minutes</b>.
              </p>

              <!-- CODE BOX -->
              <div style="text-align:center;padding:28px;border-radius:12px;background:#0f0f1a;border:1px solid #4B0082;">
                <div style="font-size:42px;letter-spacing:10px;color:#c8b4f0;font-family:monospace;">
                  ${code}
                </div>
              </div>

              <p style="margin-top:24px;color:#ffbd2e;font-size:12px;">
                ⚠️ If you did not request this, ignore this email.
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:20px;text-align:center;background:#13132a;color:#5a5a7a;font-size:11px;">
              © 2026 EliteScholars
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
        `
      });

    } catch (err) {
      return sendErr(res, "Failed to send reset email.");
    }

    // =========================
    // SUCCESS RESPONSE
    // =========================
    return sendOk(res, {
      success: true,
      message: "Reset code sent."
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message || "Internal server error"
    });
  }
}