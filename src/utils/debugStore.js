let logs = [];
let listeners = [];

export function addLog(entry) {
  logs = [
    {
      id: crypto.randomUUID(),
      ...entry
    },
    ...logs
  ].slice(0, 200);

  listeners.forEach(fn => fn(logs));
}

export function subscribe(fn) {
  listeners.push(fn);
  fn(logs);

  return () => {
    listeners = listeners.filter(l => l !== fn);
  };
}

export function clearLogs() {
  logs = [];
  listeners.forEach(fn => fn(logs));
}

// NEW: replay helper
export async function replayRequest(log) {
  try {
    if (!log?.data?.endpoint) return;

    const { endpoint, body } = log.data;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body || {})
    });

    return await res.json();
  } catch (e) {
    return { error: e.message };
  }
}