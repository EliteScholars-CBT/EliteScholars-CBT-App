let logs = [];
let listeners = [];

export function addLog(entry) {
  const log = {
    id: crypto.randomUUID(),
    time: new Date().toISOString(),
    ...entry,
  };

  logs = [log, ...logs].slice(0, 300);
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