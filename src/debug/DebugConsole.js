import React, { useEffect, useRef, useState } from "react";
import { subscribe, clearLogs } from "../utils/debugStore";

export default function DebugConsole() {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [max, setMax] = useState(false);

  const boxRef = useRef(null);

  useEffect(() => {
    const unsub = subscribe(setLogs);
    return unsub;
  }, []);

  // Drag system
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    let offsetX = 0, offsetY = 0, dragging = false;

    const down = (e) => {
      dragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
    };

    const move = (e) => {
      if (!dragging || max) return;
      el.style.left = e.clientX - offsetX + "px";
      el.style.top = e.clientY - offsetY + "px";
    };

    const up = () => (dragging = false);

    el.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [max]);

  const copy = (text) => {
    navigator.clipboard.writeText(
      typeof text === "string" ? text : JSON.stringify(text, null, 2)
    );
  };

  if (!open) {
    return (
      <div
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          background: "#111",
          color: "#0f0",
          padding: 10,
          borderRadius: 8,
          fontFamily: "monospace",
          cursor: "pointer",
          zIndex: 999999
        }}
      >
        DEBUG
      </div>
    );
  }

  return (
    <div
      ref={boxRef}
      style={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: max ? "100%" : 420,
        height: max ? "100%" : 300,
        background: "#0b0b0b",
        color: "#fff",
        fontFamily: "monospace",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #222"
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 8,
          background: "#111",
          display: "flex",
          justifyContent: "space-between",
          cursor: "move"
        }}
      >
        <span>DEBUG CONSOLE</span>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setMax(!max)}>⬜</button>
          <button onClick={clearLogs}>🧹</button>
          <button onClick={() => setOpen(false)}>✖</button>
        </div>
      </div>

      {/* Logs */}
      <div style={{ overflow: "auto", flex: 1, padding: 10 }}>
        {logs.map((l) => (
          <div
            key={l.id}
            style={{
              marginBottom: 10,
              borderLeft: `3px solid ${
                l.type === "error"
                  ? "red"
                  : l.type === "success"
                  ? "lime"
                  : "gray"
              }`,
              paddingLeft: 8
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {l.category} • {l.time}
            </div>

            <div>{l.message}</div>

            {l.data && (
              <pre style={{ fontSize: 11, opacity: 0.9 }}>
                {JSON.stringify(l.data, null, 2)}
              </pre>
            )}

            <button onClick={() => copy(l)} style={{ fontSize: 10 }}>
              copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}