import { addLog } from "./debugStore";

export function logRequest(url, options = {}) {
  addLog({
    type: "info",
    message: "NETWORK REQUEST",
    data: {
      url,
      method: options.method || "GET",
      body: options.body
    },
    time: new Date().toISOString()
  });
}

export async function safeFetch(url, options = {}) {
  logRequest(url, options);

  try {
    const res = await fetch(url, options);
    const text = await res.clone().text();

    addLog({
      type: res.ok ? "success" : "error",
      message: "NETWORK RESPONSE",
      data: {
        url,
        status: res.status,
        response: text
      },
      time: new Date().toISOString()
    });

    return res;
  } catch (err) {
    addLog({
      type: "error",
      message: "NETWORK ERROR",
      data: err.message,
      time: new Date().toISOString()
    });

    throw err;
  }
}