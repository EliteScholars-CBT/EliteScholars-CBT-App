import { useEffect, useState } from "react";

export default function useDebugAuth(enabled = true) {
  const [logs, setLogs] = useState([]);

  const log = (type, message) => {
    setLogs((prev) => [...prev, { type, message }]);
    console[type === "error" ? "error" : "log"](message);
  };

  useEffect(() => {
    if (!enabled) return;

    (async () => {
      try {
        const payload = {
          email: "michaelokpegboro@gmail.com",
          password: "oomikeoo"
        };

        log("info", "LOGIN PAYLOAD:\n" + JSON.stringify(payload, null, 2));

        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const text = await res.text();
        log("info", "LOGIN RAW:\n" + text);

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          log("error", "INVALID JSON RESPONSE");
          return;
        }

        log(
          data.success ? "success" : "error",
          "LOGIN RESULT:\n" + JSON.stringify(data, null, 2)
        );

      } catch (err) {
        log("error", err.message);
      }
    })();
  }, [enabled]);

  return { logs };
}