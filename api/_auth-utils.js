// Shared helpers for the admin auth serverless functions.
// Keeping this logic in one place so admin-login / admin-verify /
// admin-logout all parse cookies and sign/verify tokens the same way.

export const SESSION_COOKIE = 'aura_admin_session';

export function parseCookies(cookieHeader = '') {
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const idx = part.indexOf('=');
        const key = decodeURIComponent(part.slice(0, idx));
        const value = decodeURIComponent(part.slice(idx + 1));
        return [key, value];
      })
  );
}

export function serializeCookie(name, value, { maxAge, httpOnly = true, secure = true, sameSite = 'Strict', path = '/' } = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`, `Path=${path}`, `SameSite=${sameSite}`];
  if (httpOnly) parts.push('HttpOnly');
  if (secure) parts.push('Secure');
  if (typeof maxAge === 'number') parts.push(`Max-Age=${maxAge}`);
  return parts.join('; ');
}
