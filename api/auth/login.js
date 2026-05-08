import { hashPassword } from '../_helpers/hash.js';

export default async function handler(req, res) {
  try {
    const body = req.body || {};

    if (!body.email || !body.password) {
      return res.status(400).json({
        stage: "validation_error",
        success: false
      });
    }

    const passwordHash = hashPassword(body.password);

    return res.status(200).json({
      stage: "hash_test",
      success: true,
      debug: {
        passwordHash
      }
    });

  } catch (err) {
    return res.status(500).json({
      stage: "hash_crash",
      success: false,
      error: err.message
    });
  }
}