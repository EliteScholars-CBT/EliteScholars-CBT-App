export default function handler(req, res) {
  res.status(200).json({
    redis_url: process.env.UPSTASH_REDIS_REST_URL ? "set" : "missing",
    redis_token: process.env.UPSTASH_REDIS_REST_TOKEN ? "set" : "missing",
    mode: process.env.NODE_ENV
  });
}