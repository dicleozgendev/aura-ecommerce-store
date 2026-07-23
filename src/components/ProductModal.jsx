import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Check, ShoppingBag, MessageSquare, Send } from 'lucide-react';

export default function ProductModal({ product, onClose, onAddToCart, formatPrice }) {
  const [includeBundle, setIncludeBundle] = useState(true);
  const [reviews, setReviews] = useState([
    { name: "Michael K.", rating: 5, comment: "Exceeded my expectations! Build quality is top-notch and delivery was super fast.", date: "Yesterday" },
    { name: "Jessica S.", rating: 5, comment: "Sleek design and incredible battery life. Highly recommended!", date: "3 days ago" }
  ]);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 5 });

  if (!product) return null;

  const handleAddWithBundle = () => {
    onAddToCart(product);
    if (product.upsellBundle && includeBundle) {
      onAddToCart({
        id: product.upsellBundle.id,
        name: product.upsellBundle.name,
        price: product.upsellBundle.price,
        image: product.image,
        category: "Accessory Bundle"
      });
    }
    onClose();
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    setReviews([{ ...newReview, date: "Just now" }, ...reviews]);
    setNewReview({ name: '', comment: '', rating: 5 });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '320px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)'
              }}
            />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Truck size={16} style={{ color: 'var(--accent-emerald)' }} />
                <span>Free Shipping</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <RotateCcw size={16} style={{ color: 'var(--accent-cyan)' }} />
                <span>14-Day Returns</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--accent-primary)' }} />
                <span>2-Year Warranty</span>
              </div>
            </div>
          </div>

          <div>
            <span className="product-category">{product.category}</span>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h2>

            <div className="rating-row">
              <Star size={16} fill="currentColor" />
              <span style={{ fontWeight: 700 }}>{product.rating}</span>
              <span className="review-count">({product.reviewCount} Reviews)</span>
            </div>

            <div className="price-row" style={{ margin: '1rem 0' }}>
              <span className="current-price" style={{ fontSize: '1.75rem' }}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="old-price" style={{ fontSize: '1.1rem' }}>{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {product.description}
            </p>

            {/* Upsell Bundle Option */}
            {product.upsellBundle && (
              <div style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px dashed var(--accent-primary)',
                padding: '0.85rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={includeBundle}
                    onChange={(e) => setIncludeBundle(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                      ⚡ Bundle Deal: {product.upsellBundle.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                      Add for only +{formatPrice(product.upsellBundle.price)}
                    </div>
                  </div>
                </label>
              </div>
            )}

            <button
              className="btn-primary"
              style={{ width: '100%', marginBottom: '1.5rem' }}
              onClick={handleAddWithBundle}
            >
              <ShoppingBag size={18} />
              <span>{includeBundle && product.upsellBundle ? "Add Bundle to Cart" : "Add to Cart"}</span>
            </button>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquare size={18} className="gradient-text" />
            <span>Customer Reviews & Ratings</span>
          </h3>

          <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem', background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input
                type="text"
                required
                placeholder="Your Name..."
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                style={{ padding: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
              />
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                style={{ padding: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
              </select>
            </div>
            <textarea
              required
              rows="2"
              placeholder="Write your review here..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              style={{ padding: '0.5rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '6px', color: '#fff', fontSize: '0.85rem' }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', alignSelf: 'flex-start' }}>
              <Send size={14} />
              <span>Submit Review</span>
            </button>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {reviews.map((rev, idx) => (
              <div key={idx} style={{ padding: '0.75rem', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{rev.name}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{rev.date}</span>
                </div>
                <div style={{ color: 'var(--accent-amber)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                  {'★'.repeat(rev.rating)}
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
