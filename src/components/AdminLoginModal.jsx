import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

// NOTE: This is a client-side gate for demo/portfolio purposes only.
// It is NOT real authentication — the check below runs in the browser,
// so anyone can read the credentials out of the shipped JS bundle. A
// production deployment needs a real server-side login (session/JWT
// issued by a backend that verifies credentials against a database),
// not a hardcoded check like this one.
const DEMO_USERNAME = 'admin';
const DEMO_PASSWORD = 'aura2026';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setError('');
      onLoginSuccess();
      onClose();
    } else {
      setError('Invalid credentials.');
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

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            <span>Login to Dashboard</span>
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
