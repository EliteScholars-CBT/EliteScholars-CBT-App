// api/auth/register.js - updated to handle the response format
import { checkRateLimit } from '../_helpers/rateLimit.js';
import {
  sendOk,
  sendErr,
  sendRateLimited,
  sendMethodNotAllowed,
  setCors,
} from '../_helpers/response.js';
import { hashPassword } from '../_helpers/hash.js';
import { sheetsGet, sheetsPost } from '../_helpers/sheets.js';
import { logSecurityEvent } from '../_helpers/security.js';

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/;

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return sendMethodNotAllowed(res);
  }

  const DEBUG = true;

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  const key = `register:${ip}`;

  const { allowed, retryAfter } = await checkRateLimit(key, 5, 3600);

  if (!allowed) {
    await logSecurityEvent({ type: 'register_rate_limited', email: '', ip, detail: 'IP blocked' });
    return sendRateLimited(res, retryAfter);
  }

  const { firstName, lastName, email, password, studentType, selectedExams, username } =
    req.body || {};

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !studentType ||
    !selectedExams ||
    !username
  ) {
    return sendErr(res, 'All fields are required.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendErr(res, 'Invalid email address.');
  }

  if (password.length < 8) {
    return sendErr(res, 'Password must be at least 8 characters.');
  }

  const usernameTrimmed = username.trim();
  if (!USERNAME_REGEX.test(usernameTrimmed)) {
    return sendErr(
      res,
      'Username must be 3-20 characters, start with a letter, and contain only letters, numbers, or underscores.'
    );
  }

  const emailLower = email.toLowerCase().trim();
  const passwordHash = hashPassword(password);

  // CHECK IF USER EXISTS
  const existing = await sheetsGet({
    action: 'loginProfile',
    email: emailLower,
    passwordHash: '__check_exists__',
  });

  // Fix: Check if user exists based on the response format
  if (existing.success && existing.exists === true) {
    return sendErr(res, 'An account with this email already exists.');
  }

  // CHECK USERNAME AVAILABILITY
  const usernameCheck = await sheetsGet({
    action: 'checkUsername',
    username: usernameTrimmed,
  });

  if (usernameCheck.error) {
    return sendErr(res, usernameCheck.error);
  }

  // Fix: Check the available property
  if (usernameCheck.available === false) {
    return sendErr(res, 'Username is already taken. Please choose another.');
  }

  // REGISTER USER
  const result = await sheetsGet({
    action: 'registerProfile',
    email: emailLower,
    firstName,
    lastName,
    passwordHash,
    studentType,
    selectedExams: JSON.stringify(selectedExams),
    username: usernameTrimmed,
  });

  if (!result.success) {
    console.error('Registration failed:', result.error);
    return sendErr(res, result.error || 'Registration failed.');
  }

  await sheetsPost({
    event: 'register',
    name: `${firstName} ${lastName}`,
    email: emailLower,
    username: usernameTrimmed,
  });

  return sendOk(res, {
    profile: {
      email: emailLower,
      firstName,
      lastName,
      studentType,
      selectedExams,
      passwordHash,
      username: usernameTrimmed,
      stats: {},
      achievements: [],
      subjectPerformance: {},
    },
    ...(DEBUG && {
      debug: {
        inputPassword: password,
        generatedHash: passwordHash,
        ip,
      },
    }),
  });
}
