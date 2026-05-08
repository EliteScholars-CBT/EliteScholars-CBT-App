import { hashPassword } from "../_helpers/hash.js";

export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        stage: "method_not_allowed",
        success: false
      });
    }

    const body = req.body || {};

    const generatedHash = hashPassword(body.password);

    const sheetHash = "88c85478aff3f3e6e94090b7b162b9331fa7ebbab84eb7f8d8824898cf60c612";

    return res.status(200).json({
      stage: "comparison_mode",
      success: true,

      debug: {
        email: body.email,
        inputPassword: body.password,

        generatedHash,
        sheetHash,

        match: generatedHash === sheetHash
      }
    });

  } catch (err) {
    return res.status(500).json({
      stage: "error",
      success: false,
      error: err.message
    });
  }
}