// Clears the admin session cookie. Called when the admin clicks
// "Exit Admin" so the session ends on the server, not just in the UI.

import { SESSION_COOKIE, serializeCookie } from './_auth-utils.js';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', serializeCookie(SESSION_COOKIE, '', { maxAge: 0 }));
  return res.status(200).json({ ok: true });
}
