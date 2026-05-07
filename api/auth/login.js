export default function handler(req, res) {
  return res.status(200).json({
    stage: "test_hit",
    success: true,
    message: "login route is working"
  });
}