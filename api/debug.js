import { redis } from "./_helpers/redis.js";

export default async function handler(req, res) {
  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    // lightweight Redis test (non-destructive)
    let redisStatus = "not_tested";

    if (url && token) {
      try {
        await redis.set("debug:test", "ok", { ex: 10 });
        const value = await redis.get("debug:test");
        redisStatus = value === "ok" ? "working" : "failed";
      } catch (e) {
        redisStatus = "error";
      }
    } else {
      redisStatus = "missing_env";
    }

    return res.status(200).json({
      env: {
        kv_url: url ? "set" : "missing",
        kv_token: token ? "set" : "missing",
        mode: process.env.NODE_ENV || "unknown"
      },
      redis: {
        status: redisStatus
      },
      time: new Date().toISOString()
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}