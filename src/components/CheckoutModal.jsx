import React, { useState } from 'react';
import { X, CheckCircle, CreditCard, Lock, ArrowRight, Smartphone } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({ isOpen, onClose, cartItems, totalAmount, formatPrice, onClearCart }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'New York',
    cardNumber: '4543 •••• •••• 8892',
    cardExpiry: '12/28',
    cardCvc: '•••',
    paymentMethod: 'card'
  });
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const newOrderNum = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNum);
    setStep(3);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }

    onClearCart();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '640px' }}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {step !== 3 && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
            <div style={{ fontWeight: step === 1 ? 800 : 400, color: step === 1 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
              1. Shipping Details
            </div>
            <span>→</span>
            <div style={{ fontWeight: step === 2 ? 800 : 400, color: step === 2 ? 'var(--accent-primary)' : 'var(--text-muted)' }}>
              2. Payment Method
            </div>
          </div>
        )}

        {/* STEP 1: Shipping Form */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Shipping & Contact Information</h3>
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Shipping Address *</label>
                <textarea
                  required
                  rows="3"
                  placeholder="Street Address, Apartment, Suite, City, ZIP..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                <span>Continue to Payment</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Payment Selection */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem' }}>Select Payment Method</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 1rem',
                background: 'var(--bg-secondary)',
                border: formData.paymentMethod === 'card' ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                />
                <CreditCard size={20} className="gradient-text" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Credit / Debit Card (Stripe Secure Checkout)</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Visa, Mastercard, Amex supported</div>
                </div>
              </label>

              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 1rem',
                background: 'var(--bg-secondary)',
                border: formData.paymentMethod === 'whatsapp' ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'whatsapp'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                />
                <Smartphone size={20} style={{ color: 'var(--accent-emerald)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Instant Express Order via Representative</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Direct confirmation via support team</div>
                </div>
              </label>
            </div>

            {/* Interactive Card Preview */}
            {formData.paymentMethod === 'card' && (
              <div style={{
                background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <CreditCard size={28} />
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>PREMIUM CARD</span>
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '0.15em', marginBottom: '1rem' }}>
                  {formData.cardNumber}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <div>
                    <div style={{ opacity: 0.7 }}>CARDHOLDER</div>
                    <div style={{ fontWeight: 700 }}>{formData.fullName || 'JOHN DOE'}</div>
                  </div>
                  <div>
                    <div style={{ opacity: 0.7 }}>EXPIRES</div>
                    <div style={{ fontWeight: 700 }}>{formData.cardExpiry}</div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitOrder}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Total Payable:</span>
                <span className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 800 }}>{formatPrice(totalAmount)}</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} style={{ padding: '0.75rem 1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)' }}>
                  Back
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  <Lock size={18} />
                  <span>Complete Order Securely ({formatPrice(totalAmount)})</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: Order Confirmation */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <CheckCircle size={64} style={{ color: 'var(--accent-emerald)', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Order Confirmed! 🎉</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Thank you! Your order has been placed and is being processed for express shipping.
            </p>

            <div style={{
              background: 'var(--bg-secondary)',
              padding: '1.25rem',
              borderRadius: '12px',
              border: '1px dashed var(--accent-primary)',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order Number:</span>
                <strong style={{ color: 'var(--accent-primary)' }}>{orderNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Delivery:</span>
                <strong>Tomorrow (24h Express Shipping)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Recipient Email:</span>
                <strong>{formData.email || 'customer@example.com'}</strong>
              </div>
            </div>

            <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
