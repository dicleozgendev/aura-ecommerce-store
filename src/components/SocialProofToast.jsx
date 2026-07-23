import React, { useState, useEffect } from 'react';
import { RECENT_PURCHASES } from '../data/products';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function SocialProofToast() {
  const [currentToast, setCurrentToast] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show first toast after 4 seconds, then cycle every 12 seconds
    const timer = setTimeout(() => {
      showRandomToast();
    }, 3000);

    const interval = setInterval(() => {
      showRandomToast();
    }, 14000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const showRandomToast = () => {
    const randomItem = RECENT_PURCHASES[Math.floor(Math.random() * RECENT_PURCHASES.length)];
    setCurrentToast(randomItem);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 5500);
  };

  if (!visible || !currentToast) return null;

  return (
    <div className="social-proof-toast">
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: 'rgba(99, 102, 241, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-primary)',
        flexShrink: 0
      }}>
        <ShoppingBag size={20} />
      </div>

      <div style={{ flex: 1, fontSize: '0.8rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          <span>{currentToast.name}</span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({currentToast.city})</span>
          <CheckCircle2 size={13} style={{ color: 'var(--accent-emerald)', marginLeft: 'auto' }} />
        </div>
        <div style={{ color: 'var(--accent-primary)', fontWeight: 600, marginTop: '0.1rem' }}>
          {currentToast.product}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
          Satın aldı • {currentToast.time}
        </div>
      </div>
    </div>
  );
}
