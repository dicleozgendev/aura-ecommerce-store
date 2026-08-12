import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

// Real server-side login. Credentials are checked in api/admin-login.js
// against environment variables (never shipped to the browser); on
// success the server sets an HttpOnly session cookie. See
// api/admin-login.js and .env.example for setup.
export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setUsername('');
        setPassword('');
        onLoginSuccess();
        onClose();
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '400px', textAlign: 'center' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem auto',
          color: 'var(--accent-primary)'
        }}>
          <Lock size={28} />
        </div>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Admin Access</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Enter password to access store control dashboard.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <input
            type="text"
            required
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: '0.65rem 0.85rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '0.9rem'
            }}
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '0.65rem 0.85rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
              fontSize: '0.9rem'
            }}
          />

          {error && <p style={{ color: 'var(--accent-rose)', fontSize: '0.8rem' }}>{error}</p>}

          <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '0.5rem', opacity: isSubmitting ? 0.7 : 1 }}>
            <span>{isSubmitting ? 'Checking...' : 'Login to Dashboard'}</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
          <ShieldCheck size={14} style={{ color: 'var(--accent-emerald)' }} />
          <span>Demo Preview Only — Not Real Authentication</span>
        </div>
      </div>
    </div>
  );
}
