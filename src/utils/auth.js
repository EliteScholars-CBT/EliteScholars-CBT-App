const USERS_KEY  = 'es_users';
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxmY2qZ-5zexeOLdZba1U6k3Sl7czKLzC0PjW4jP1FSO4P_mMkSWN4fUmmCBPjt09YU/exec';

function syncUserToSheets(user) {
  try {
    fetch(SHEETS_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'registerUser',
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        studentType: user.studentType,
        selectedExams: user.selectedExams,
      }),
    });
  } catch {}
}

function hashPassword(pw) {
  let h = 5381;
  for (let i = 0; i < pw.length; i++) {
    h = ((h << 5) + h) ^ pw.charCodeAt(i);
  }
  return (h >>> 0).toString(16);
}

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch { return {}; }
}

function saveUsers(users) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {}
}

export function registerUser({ firstName, lastName, email, password, studentType, selectedExams }) {
  const users = loadUsers();
  const key = email.toLowerCase().trim();
  if (users[key]) return { ok: false, error: 'An account with this email already exists. Please log in.' };
  users[key] = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: key,
    passwordHash: hashPassword(password),
    studentType,
    selectedExams: selectedExams || [],
    createdAt: new Date().toISOString(),
  };
  saveUsers(users);
  syncUserToSheets(users[key]);
  return { ok: true, user: users[key] };
}

export function loginUser({ email, password }) {
  const users = loadUsers();
  const key   = email.toLowerCase().trim();
  const user  = users[key];
  if (!user) return { ok: false, error: 'No account found with this email. Please sign up.' };
  if (user.passwordHash !== hashPassword(password)) return { ok: false, error: 'Incorrect password. Try again or use Forgot Password.' };
  return { ok: true, user };
}

export function forgotPassword(email) {
  const users = loadUsers();
  const key   = email.toLowerCase().trim();
  if (!users[key]) return { ok: false, error: 'No account found with this email.' };
  const reset = Math.random().toString(36).slice(2, 8).toUpperCase();
  users[key].resetCode = reset;
  users[key].resetExpiry = Date.now() + 15 * 60 * 1000;
  saveUsers(users);
  return { ok: true, code: reset, name: users[key].firstName };
}

export function resetPassword(email, code, newPassword) {
  const users = loadUsers();
  const key   = email.toLowerCase().trim();
  const user  = users[key];
  if (!user) return { ok: false, error: 'Account not found.' };
  if (!user.resetCode || user.resetCode !== code.toUpperCase()) return { ok: false, error: 'Invalid reset code.' };
  if (Date.now() > user.resetExpiry) return { ok: false, error: 'Reset code has expired. Request a new one.' };
  user.passwordHash = hashPassword(newPassword);
  delete user.resetCode;
  delete user.resetExpiry;
  saveUsers(users);
  return { ok: true };
}

export function getUser(email) {
  const users = loadUsers();
  return users[email.toLowerCase().trim()] || null;
}

export function updateUser(email, updates) {
  const users = loadUsers();
  const key   = email.toLowerCase().trim();
  if (!users[key]) return false;
  users[key] = { ...users[key], ...updates };
  saveUsers(users);
  return true;
}
