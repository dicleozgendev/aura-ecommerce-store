import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';
import { SlidersHorizontal } from 'lucide-react';

export default function ProductGrid({
  products,
  onAddToCart,
  onQuickView,
  wishlist,
  onToggleWishlist,
  formatPrice,
  selectedCategory,
  setSelectedCategory
}) {
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = products
    .filter(p => selectedCategory === 'All' || selectedCategory === 'Tümü' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });

  return (
    <section className="products-section container">
      <div className="category-section">
        <div className="filter-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SlidersHorizontal size={16} style={{ color: 'var(--text-muted)' }} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              padding: '0.45rem 0.8rem',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <option value="popular">Sort by: Best Sellers</option>
            <option value="rating">Rating: Highest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
            formatPrice={formatPrice}
          />
        ))}
      </div>
    </section>
  );
}
