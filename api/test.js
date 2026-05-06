// api/test.js
export default async function handler(req) {
  return Response.json({
    ok: true,
    message: 'API is working 🚀',
    method: req.method,
    time: new Date().toISOString(),
  });
}

export const config = { runtime: 'edge' };