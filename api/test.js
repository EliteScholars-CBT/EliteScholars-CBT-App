// api/test.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(200).json({
    ok:      true,
    message: 'API is working!',
    method:  req.method,
    time:    new Date().toISOString(),
  });
}