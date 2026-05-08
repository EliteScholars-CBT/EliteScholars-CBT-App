import { useEffect } from "react";
import { addLog } from "../utils/debugStore";

export default function useDebugAuth(enabled = true) {

  const log = (type, message, data) => {
    addLog({
      type,
      message,
      data,
      time: new Date().toISOString()
    });

    if (type === "error") console.error(message, data);
    else console.log(message, data);
  };

  useEffect(() => {
    if (!enabled) return;

    (async () => {

      // =========================
      // LOGIN
      // =========================
      try {
        const payload = {
          email: "michaelokpegboro@gmail.com",
          password: "oomikeoo"
        };

        log("info", "LOGIN PAYLOAD", payload);

        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const text = await res.text();
        log("info", "LOGIN RAW", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          log("error", "LOGIN NOT VALID JSON", text);
          return;
        }

        log("info", "BACKEND HASH", data?.debug?.passwordHash || "missing");

        log(
          data.success ? "success" : "error",
          "LOGIN RESULT",
          data
        );

      } catch (err) {
        log("error", "LOGIN ERROR", err.message);
      }

    })();
  }, [enabled]);
}