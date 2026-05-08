import { hashPassword } from '../_helpers/hash.js';
import { sheetsGet } from '../_helpers/sheets.js';

export default async function handler(req, res) {
  try {

    if (req.method !== "POST") {
      return res.status(405).json({
        stage: "method_blocked",
        success: false
      });
    }

    const body = req.body || {};

    if (!body.email || !body.password) {
      return res.status(400).json({
        stage: "validation_error",
        success: false,
        message: "Email and password required"
      });
    }

    const emailLower = body.email.toLowerCase().trim();

    const passwordHash = hashPassword(body.password);

return res.status(200).json({
  stage: "hash_compare",
  success: true,

  debug: {
    rawPassword: body.password,
    generatedHash: passwordHash
  }
});

    const result = await sheetsGet({
      action: "loginProfile",
      email: emailLower,
      passwordHash
    });

    return res.status(200).json({
      stage: "login_result",
      success: true,

      debug: {
        sheetsResult: result
      }
    });

  } catch (err) {

    return res.status(500).json({
      stage: "login_crash",
      success: false,
      error: err.message
    });

  }
}