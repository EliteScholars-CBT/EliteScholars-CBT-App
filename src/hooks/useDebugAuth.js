import { useEffect, useState } from "react";

export default function useDebugAuth(enabled = true) {
  const [logs, setLogs] = useState([]);

  const log = (type, message) => {
    setLogs((prev) => [...prev, { type, message }]);
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
          log("error", "LOGIN NOT VALID JSON");
          return;
        }

log(
  "info",
  "BACKEND HASH:\n" + (data?.debug?.passwordHash || "missing")
);

        log(
          data.success ? "success" : "error",
          "LOGIN RESULT:\n" +
            "stage: " + data.stage +
            "\nsuccess: " + data.success
        );
      } catch (err) {
        log("error", "LOGIN ERROR:\n" + err.message);
      }

      // =========================
      // REGISTER
      // =========================
      /* try {
        const payload = {
          firstName: "Test",
          lastName: "User",
          email: "test@gmail.com",
          password: "password",
          studentType: "waec",
          selectedExams: ["math", "english"]
        };

        log("info", "REGISTER PAYLOAD:\n" + JSON.stringify(payload, null, 2));

        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const text = await res.text();
        log("info", "REGISTER RAW:\n" + text);

        let data;
        try {
          data = JSON.parse(text);
        } catch {
          log("error", "REGISTER NOT VALID JSON");
          return;
        }

        log(
          data.success ? "success" : "error",
          "REGISTER RESULT:\nemail: " + (data?.profile?.email || "none")
        );
      } catch (err) {
        log("error", "REGISTER ERROR:\n" + err.message);
      }
*/


      // =========================
      // FORGOT
      // =========================
      try {
        const res = await fetch("/api/auth/forgot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "michaelokpegboro@gmail.com"
          })
        });

        const text = await res.text();
        log("info", "FORGOT RAW:\n" + text);
      } catch (err) {
        log("error", "FORGOT ERROR:\n" + err.message);
      }

      // =========================
      // RESET
      // =========================
      /* try {
        const payload = {
          email: "michaelokpegboro@gmail.com",
          code: "123456",
          newPassword: "oomikeoo"
        };

        log("info", "RESET PAYLOAD:\n" + JSON.stringify(payload, null, 2));

        const res = await fetch("/api/auth/reset", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const text = await res.text();
        log("info", "RESET RAW:\n" + text);
      } catch (err) {
        log("error", "RESET ERROR:\n" + err.message);
      }
*/

    })();
  }, [enabled]);

  return { logs };
}