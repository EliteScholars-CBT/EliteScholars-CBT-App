import React, { useEffect, useState } from "react";
import { subscribe, clearLogs } from "../utils/debugStore";

export default function DebugConsole() {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const unsub = subscribe(setLogs);
    return unsub;
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: 10,
      right: 10,
      width: open ? 380 : 140,
      height: open ? 320 : 40,
      background: "#0f172a",
      color: "white",
      fontSize: 11,
      borderRadius: 10,
      overflow: "hidden",
      zIndex: 999999
    }}>
      
      {/* header */}
      <div style={{
        padding: 8,
        display: "flex",
        justifyContent: "space-between",
        background: "#111827",
        cursor: "pointer"
      }}>
        <span onClick={() => setOpen(o => !o)}>
          🧪 Debug Console {open ? "▼" : "▲"}
        </span>

        <button onClick={clearLogs} style={{
          background: "transparent",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}>
          clear
        </button>
      </div>

      {/* logs */}
      {open && (
        <div style={{
          height: 270,
          overflowY: "auto",
          padding: 6
        }}>
          {logs.map((l, i) => (
            <div key={i} style={{
              marginBottom: 8,
              padding: 6,
              borderRadius: 6,
              background:
                l.type === "error" ? "#7f1d1d"
                : l.type === "success" ? "#14532d"
                : "#1f2937"
            }}>
              <div style={{ fontSize: 10, opacity: 0.6 }}>
                {l.time}
              </div>

              <div><b>{l.type.toUpperCase()}</b></div>

              <div>{l.message}</div>

              {l.data && (
                <pre style={{ fontSize: 10 }}>
                  {typeof l.data === "string"
                    ? l.data
                    : JSON.stringify(l.data, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}