import { useState } from "react";

export default function DebugConsole({ logs }) {
  const [open, setOpen] = useState(true);

  const getColor = (type) => {
    switch (type) {
      case "success":
        return "#00ff99";
      case "error":
        return "#ff4d4d";
      case "warn":
        return "#ffcc00";
      case "info":
      default:
        return "#66b3ff";
    }
  };

  return (
    <div style={styles.wrapper}>
      <button style={styles.toggle} onClick={() => setOpen(!open)}>
        {open ? "Hide Console" : "Show Console"}
      </button>

      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>DEBUG CONSOLE</div>

          <div style={styles.body}>
            {logs.length === 0 && (
              <div style={styles.line}>No logs yet...</div>
            )}

            {logs.map((log, i) => (
              <div
                key={i}
                style={{
                  ...styles.line,
                  color: getColor(log.type)
                }}
              >
                <div style={styles.meta}>
                  [{log.type?.toUpperCase() || "INFO"}]
                </div>

                <pre style={styles.text}>
                  {typeof log.message === "string"
                    ? log.message
                    : JSON.stringify(log.message, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    width: "340px",
    zIndex: 99999,
    fontFamily: "monospace"
  },

  toggle: {
    width: "100%",
    padding: "6px",
    fontSize: "12px",
    background: "#111",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "6px"
  },

  panel: {
    marginTop: "6px",
    background: "#0b0b0b",
    borderRadius: "8px",
    border: "1px solid #222",
    overflow: "hidden"
  },

  header: {
    padding: "6px",
    fontSize: "12px",
    color: "#fff",
    borderBottom: "1px solid #222",
    background: "#111"
  },

  body: {
    maxHeight: "260px",
    overflowY: "auto",
    padding: "6px",
    fontSize: "11px"
  },

  line: {
    marginBottom: "10px",
    padding: "6px",
    borderRadius: "6px",
    background: "#111"
  },

  meta: {
    fontSize: "10px",
    opacity: 0.8,
    marginBottom: "4px"
  },

  text: {
    margin: 0,
    whiteSpace: "pre-wrap",
    fontSize: "11px"
  }
};