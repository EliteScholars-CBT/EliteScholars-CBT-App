export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        stage: "method_blocked",
        success: false
      });
    }

    const body = req.body || {};

    return res.status(200).json({
      stage: "body_check",
      success: true,
      message: "Body received successfully",

      debug: {
        body,
        bodyType: typeof body,
        hasEmail: Boolean(body.email),
        hasPassword: Boolean(body.password)
      }
    });

  } catch (err) {
    return res.status(500).json({
      stage: "debug_error",
      success: false,
      error: err.message
    });
  }
}