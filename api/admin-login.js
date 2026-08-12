// Real server-side admin login.
//
// Replaces the old client-side check that used to live in
// AdminLoginModal.jsx (username/password hardcoded directly in the
// shipped JS bundle, readable by anyone via devtools). Credentials are
// now verified here, on the server, against environment variables that
// never reach the browser. On success we issue a short-lived, signed
// JWT in an HttpOnly cookie -- the browser can't read or forge it.
//
// Required environment variables (set in Vercel -> Project -> Settings
// -> Environment Variables, see .env.example for how to generate them):
//   ADMIN_USERNAME
//   ADMIN_PASSWORD_HASH   (a bcrypt hash, NOT the plaintext password)
//   ADMIN_JWT_SECRET      (a long random string)

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { SESSION_COOKIE, serializeCookie } from './_auth-utils.js';

// Best-effort per-IP rate limit. This resets whenever the serverless
// function cold-starts, so it is a speed bump against casual brute
// forcing, not a real distributed rate limiter -- fine for a portfolio
// demo, not sufficient on its own for a production admin panel.
const attempts = new Map();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = attempts.get(ip) || { count: 0, windowStart: now };
  if (now - entry.windowStart > WINDOW_MS) {
    entry.count = 0;
    entry.windowStart = now;
  }
  entry.count += 1;
  attempts.set(ip, entry);
  return entry.count > MAX_ATTEMPTS;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { ADMIN_USERNAME, ADMIN_PASSWORD_HASH, ADMIN_JWT_SECRET } = process.env;
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !ADMIN_JWT_SECRET) {
    console.error('[admin-login] Missing ADMIN_USERNAME / ADMIN_PASSWORD_HASH / ADMIN_JWT_SECRET env vars.');
    return res.status(500).json({ error: 'Admin auth is not configured on this deployment.' });
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many attempts. Try again in a minute.' });
  }

  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const usernameOk = username === ADMIN_USERNAME;
  const passwordOk = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

  if (!usernameOk || !passwordOk) {
    // Deliberately generic -- never confirm which field was wrong,
    // and never echo the expected credentials back to the client.
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const maxAgeSeconds = 60 * 60 * 2; // 2 hours
  const token = jwt.sign({ sub: username, role: 'admin' }, ADMIN_JWT_SECRET, {
    expiresIn: maxAgeSeconds,
  });

  res.setHeader('Set-Cookie', serializeCookie(SESSION_COOKIE, token, { maxAge: maxAgeSeconds }));
  return res.status(200).json({ ok: true });
}
