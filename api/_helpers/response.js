// ============================================================================
// api/_helpers/response.js — Standardised API responses
// ============================================================================

export function ok(data = {}) {
  return Response.json({ success: true, ...data }, { status: 200 });
}

export function err(message, status = 400) {
  return Response.json({ success: false, error: message }, { status });
}

export function rateLimited(retryAfter = 900) {
  return Response.json(
    { success: false, error: `Too many attempts. Try again in ${Math.ceil(retryAfter / 60)} minutes.` },
    {
      status: 429,
      headers: { 'Retry-After': String(retryAfter) },
    }
  );
}

export function methodNotAllowed() {
  return Response.json({ success: false, error: 'Method not allowed.' }, { status: 405 });
}

export function cors(response) {
  const headers = new Headers(response.headers);
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return new Response(response.body, { status: response.status, headers });
}