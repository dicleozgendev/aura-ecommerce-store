import React from 'react';
import { Star, Heart, Eye, ShoppingBag } from 'lucide-react';

export default function ProductCard({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
  formatPrice
}) {
  return (
    <div className="glass-card product-card">
      <div className="product-card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        {product.badge && (
          <span className="card-tag-badge">{product.badge}</span>
        )}

        {product.stock <= 5 && (
          <span className="stock-urgency-tag">
            🔥 Only {product.stock} Left!
          </span>
        )}

        <div className="card-actions-overlay">
          <button
            className="nav-btn"
            onClick={() => onToggleWishlist(product.id)}
            title="Add to Wishlist"
            style={{ color: isWishlisted ? 'var(--accent-rose)' : 'inherit' }}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button
            className="nav-btn"
            onClick={() => onQuickView(product)}
            title="Quick View"
          >
            <Eye size={18} />
          </button>
        </div>
      </div>

      <div className="product-card-body">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title" style={{ fontSize: '1rem' }}>{product.name}</h3>

        <div className="rating-row">
          <Star size={14} fill="currentColor" />
          <span style={{ fontWeight: 700 }}>{product.rating}</span>
          <span className="review-count">({product.reviewCount})</span>
        </div>

        <div className="price-row">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="old-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <button
          className="card-add-btn"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingBag size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
