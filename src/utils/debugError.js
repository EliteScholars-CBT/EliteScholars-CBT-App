import { addLog } from "./debugStore";

export function installGlobalErrorDebugger() {
  window.onerror = (msg, src, line, col, err) => {
    addLog({
      type: "error",
      category: "runtime",
      message: msg,
      data: {
        source: src,
        line,
        column: col,
        stack: err?.stack
      }
    });
  };

  window.onunhandledrejection = (event) => {
    addLog({
      type: "error",
      category: "promise",
      message: "Unhandled Promise Rejection",
      data: event.reason
    });
  };
}