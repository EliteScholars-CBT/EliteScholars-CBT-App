import React, { useEffect, useRef, useState } from "react";
import { subscribe, clearLogs } from "../utils/debugStore";

export default function DebugConsole() {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [max, setMax] = useState(false);

  const boxRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    return subscribe(setLogs);
  }, []);

  // auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Drag system (fixed)
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    let offsetX = 0;
    let offsetY = 0;
    let dragging = false;

    const down = (e) => {
      if (max) return;
      dragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      e.preventDefault();
    };

    const move = (e) => {
      if (!dragging || max) return;
      el.style.left = `${e.clientX - offsetX}px`;
      el.style.top = `${e.clientY - offsetY}px`;
      el.style.right = "auto";
      el.style.bottom = "auto";
    };

    const up = () => {
      dragging = false;
    };

    el.addEventListener("mousedown", down);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      el.removeEventListener("mousedown", down);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [max]);

  const copy = (data) => {
    navigator.clipboard.writeText(
      typeof data === "string"
        ? data
        : JSON.stringify(data, null, 2)
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
        bottom: max ? 0 : 20,
        right: max ? 0 : 20,
        width: max ? "100%" : 420,
        height: max ? "100%" : 320,
        background: "#0b0b0b",
        color: "#fff",
        fontFamily: "monospace",
        zIndex: 999999,
        display: "flex",
        flexDirection: "column",
        border: "1px solid #222",
        userSelect: "none"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: 8,
          background: "#111",
          display: "flex",
          justifyContent: "space-between",
          cursor: max ? "default" : "move"
        }}
      >
        <span>DEBUG CONSOLE</span>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setMax(!max)}>⬜</button>
          <button onClick={clearLogs}>🧹</button>
          <button onClick={() => setOpen(false)}>✖</button>
        </div>
      </div>

      {/* LOGS */}
      <div
        ref={scrollRef}
        style={{ overflow: "auto", flex: 1, padding: 10 }}
      >
        {logs.map((l, i) => (
          <div
            key={l.id || i}
            style={{
              marginBottom: 10,
              borderLeft: `3px solid ${
                l.type === "error"
                  ? "red"
                  : l.type === "success"
                  ? "lime"
                  : "#666"
              }`,
              paddingLeft: 8
            }}
          >
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {l.category || "log"} • {l.time || ""}
            </div>

            <div>{l.message}</div>

            {l.data && (
              <pre style={{ fontSize: 11, opacity: 0.9 }}>
                {JSON.stringify(l.data, null, 2)}
              </pre>
            )}

            <button
              onClick={() => copy(l)}
              style={{ fontSize: 10 }}
            >
              copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}