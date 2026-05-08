let logs = [];
let listeners = [];

export function addLog(entry) {
  logs = [entry, ...logs].slice(0, 200);
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