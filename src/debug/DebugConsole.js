import React from "react";

export default function DebugConsole({ logs }) {
  const copy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>DEBUG CONSOLE</div>

      <div style={styles.body}>
        {logs.map((log, i) => (
          <div key={i} style={{ ...styles.log, ...color(log.type) }}>
            <div style={styles.row}>
              <span>{log.type.toUpperCase()}</span>

              <button
                onClick={() => copy(log.message)}
                style={styles.copy}
              >
                📋
              </button>
            </div>

            <pre style={styles.pre}>{log.message}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

function color(type) {
  if (type === "error") return { borderLeft: "3px solid red" };
  if (type === "success") return { borderLeft: "3px solid limegreen" };
  return { borderLeft: "3px solid #888" };
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: 0,
    right: 0,
    width: "420px",
    maxHeight: "45vh",
    background: "#0f0f0f",
    color: "#fff",
    fontSize: "12px",
    zIndex: 99999,
    borderTopLeftRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 0 20px rgba(0,0,0,0.6)"
  },
  header: {
    padding: "8px",
    background: "#1a1a1a",
    fontWeight: "bold"
  },
  body: {
    overflowY: "auto",
    maxHeight: "40vh",
    padding: "8px"
  },
  log: {
    background: "#151515",
    padding: "8px",
    marginBottom: "6px",
    borderRadius: "6px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px"
  },
  copy: {
    background: "transparent",
    border: "none",
    color: "#aaa",
    cursor: "pointer"
  },
  pre: {
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
  }
};