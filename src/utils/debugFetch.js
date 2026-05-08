import { addLog } from "./debugStore";

export async function debugFetch(url, options = {}) {
  addLog({
    type: "info",
    category: "network",
    message: "REQUEST",
    data: { url, method: options.method || "GET", body: options.body }
  });

  try {
    const res = await fetch(url, options);
    const text = await res.clone().text();

    addLog({
      type: res.ok ? "success" : "error",
      category: "network",
      message: "RESPONSE",
      data: {
        url,
        status: res.status,
        response: text
      }
    });

    return res;
  } catch (err) {
    addLog({
      type: "error",
      category: "network",
      message: "NETWORK ERROR",
      data: err.message
    });
    throw err;
  }
}