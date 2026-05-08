import { sheetsGet } from '../_helpers/sheets.js';

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    if (!body.email || !body.password) {
      return res.status(400).json({
        stage: "validation_error",
        success: false
      });
    }

    const result = await sheetsGet({
      action: "loginProfile",
      email: body.email,
      passwordHash: body.password
    });

    return res.status(200).json({
      stage: "sheets_test",
      success: true,
      debug: {
        result
      }
    });

  } catch (err) {
    return res.status(500).json({
      stage: "sheets_crash",
      success: false,
      error: err.message
    });
  }
}