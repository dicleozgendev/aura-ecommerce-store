import React, { useState, useEffect } from 'react';
import { X, Gift, Sparkles, Check } from 'lucide-react';

export default function LeadPopup({ onApplyCoupon }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenLeadPopup');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenLeadPopup', 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      onApplyCoupon({ code: 'BONUS10', percent: 10 });
      sessionStorage.setItem('hasSeenLeadPopup', 'true');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" style={{ maxWidth: '480px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose}>
          <X size={18} />
        </button>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto',
          color: '#fff',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Gift size={32} />
        </div>

        {!isSubmitted ? (
          <>
            <h2 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
              Unlock Exclusive <span className="gradient-text">10% Discount!</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Enter your email address to instantly unlock your VIP 10% discount promo code for your order.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  textAlign: 'center'
                }}
              />
              <button type="submit" className="btn-primary">
                <Sparkles size={18} />
                <span>Get 10% Off Promo Code</span>
              </button>
            </form>
          </>
        ) : (
          <div>
            <div style={{ color: 'var(--accent-emerald)', margin: '1rem 0' }}>
              <Check size={48} style={{ margin: '0 auto' }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Congratulations! Promo Unlocked 🎉</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Your VIP promo code has been automatically applied to your cart:
            </p>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '2px dashed var(--accent-primary)',
              padding: '0.75rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--accent-primary)',
              letterSpacing: '0.1em',
              marginBottom: '1.25rem'
            }}>
              BONUS10
            </div>
            <button className="btn-primary" onClick={handleClose} style={{ width: '100%' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
