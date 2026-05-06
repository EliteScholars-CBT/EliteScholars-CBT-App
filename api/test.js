// /api/test.js
export default function handler(req, res) {
  try {
    console.log("API hit:", req.method);

    return res.status(200).json({
      ok: true,
      message: "API is working 🚀",
      method: req.method,
      time: new Date().toISOString(),
    });

  } catch (error) {
    console.error("API Error:", error);

    return res.status(500).json({
      ok: false,
      message: "API failed ❌",
      error: error.message,
      stack: error.stack,
    });
  }
}