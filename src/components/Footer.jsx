import React from 'react';
import { ShieldCheck, Truck, Headphones, RotateCcw, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--glass-border)',
      padding: '3.5rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container">
        {/* Trust Features Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--glass-border)',
          marginBottom: '2.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Truck size={32} className="gradient-text" />
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>Free Same-Day Shipping</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>On all orders over $200</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <RotateCcw size={32} className="gradient-text" />
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>14-Day Easy Returns</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hassle-free money back policy</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <ShieldCheck size={32} className="gradient-text" />
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>256-Bit Encrypted Security</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stripe & SSL protection</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Headphones size={32} className="gradient-text" />
            <div>
              <h4 style={{ fontSize: '0.95rem' }}>24/7 VIP Customer Care</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dedicated support team</p>
            </div>
          </div>
        </div>

        {/* Links & Brand Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem' }}>
              <Sparkles size={24} className="gradient-text" />
              <span>AURA<span className="gradient-text">STORE</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '320px', lineHeight: 1.6 }}>
              Premium e-commerce platform delivering high-converting technology, wearable accessories, and digital asset suites worldwide.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>All Products</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Best Sellers</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Featured Deals</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Digital Assets</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Track Order</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Shipping & Delivery</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Returns & Refund</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem' }}>Secure Payment</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Protected by Visa, Mastercard, Apple Pay, and Stripe SSL.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          © 2026 AURA STORE Inc. All Rights Reserved. High-Converting E-Commerce Platform.
        </div>
      </div>
    </footer>
  );
}
