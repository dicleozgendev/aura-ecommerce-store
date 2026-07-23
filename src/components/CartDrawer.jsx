import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedCheckout,
  formatPrice,
  appliedCoupon,
  setAppliedCoupon
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 200;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (subtotal * 0.1) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const shippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'BONUS10') {
      setAppliedCoupon({ code: 'BONUS10', percent: 10 });
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try "BONUS10".');
    }
  };

  return (
    <>
      <div className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />

      <aside className={`cart-drawer ${isOpen ? 'active' : ''}`}>
        <div className="cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} className="gradient-text" />
            <h3 style={{ fontSize: '1.2rem' }}>Shopping Cart</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>({cartItems.length} Items)</span>
          </div>
          <button className="nav-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="free-shipping-bar">
          <div style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
            <span>
              {shippingRemaining === 0 ? (
                <strong style={{ color: 'var(--accent-emerald)' }}>🎉 Congratulations! You unlocked Free Shipping!</strong>
              ) : (
                `Add ${formatPrice(shippingRemaining)} more for FREE Express Shipping`
              )}
            </span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-list">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p>Your shopping cart is empty.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Start exploring featured deals now!</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.name}</h4>
                  <div style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '0.95rem' }}>
                    {formatPrice(item.price)}
                  </div>

                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity - 1)}>-</button>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button className="qty-btn" onClick={() => onUpdateQty(item.id, item.quantity + 1)}>+</button>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      style={{ marginLeft: 'auto', color: 'var(--accent-rose)', opacity: 0.8 }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <form onSubmit={handleApplyCoupon} className="coupon-box">
              <input
                type="text"
                placeholder="Promo Code (e.g. BONUS10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                Apply
              </button>
            </form>
            {couponError && <p style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>{couponError}</p>}
            {appliedCoupon && <p style={{ color: 'var(--accent-emerald)', fontSize: '0.75rem', marginBottom: '0.5rem' }}>✓ 10% BONUS10 Discount Applied!</p>}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-emerald)' }}>
                  <span>Discount (10%):</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Shipping:</span>
                <span>{subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : formatPrice(15)}</span>
              </div>
              <div style={{
                display: 'flex',
                justify: 'space-between',
                fontWeight: 800,
                fontSize: '1.2rem',
                borderTop: '1px solid var(--glass-border)',
                paddingTop: '0.5rem',
                color: 'var(--text-primary)'
              }}>
                <span>Total Amount:</span>
                <span className="gradient-text">{formatPrice(grandTotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 15))}</span>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={onProceedCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} style={{ color: 'var(--accent-emerald)' }} />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
