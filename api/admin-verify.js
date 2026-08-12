// Checks whether the request carries a valid admin session cookie.
// Used on page load so a real session (not just in-memory React state)
// decides whether the dashboard is shown, and to let App.jsx restore
// the admin view across a page refresh within the token's lifetime.

import jwt from 'jsonwebtoken';
import { SESSION_COOKIE, parseCookies } from './_auth-utils.js';

export default function handler(req, res) {
  const { ADMIN_JWT_SECRET } = process.env;
  if (!ADMIN_JWT_SECRET) {
    return res.status(200).json({ authenticated: false });
  }

  const cookies = parseCookies(req.headers.cookie || '');
  const token = cookies[SESSION_COOKIE];
  if (!token) {
    return res.status(200).json({ authenticated: false });
  }

  try {
    jwt.verify(token, ADMIN_JWT_SECRET);
    return res.status(200).json({ authenticated: true });
  } catch {
    return res.status(200).json({ authenticated: false });
  }
}
