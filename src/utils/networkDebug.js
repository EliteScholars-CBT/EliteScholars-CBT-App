import { addLog } from "./debugStore";

export function installNetworkDebugger() {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const [url, config] = args;

    addLog({
      type: "info",
      message: "NETWORK REQUEST",
      data: { url, method: config?.method || "GET", body: config?.body },
      time: new Date().toISOString()
    });

    try {
      const res = await originalFetch(...args);

      const clone = res.clone();

      let text = "";
      try {
        text = await clone.text();
      } catch {}

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
  };
}