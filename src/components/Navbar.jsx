import React from 'react';
import { ShoppingBag, Heart, Search, Sun, Moon, Sparkles, LayoutDashboard, Globe } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export default function Navbar({
  cartCount,
  wishlistCount,
  onOpenCart,
  searchTerm,
  setSearchTerm,
  theme,
  toggleTheme,
  currency,
  setCurrency,
  lang,
  setLang,
  isAdmin,
  onToggleAdmin
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS['EN'];

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="#" className="brand-logo" onClick={(e) => { e.preventDefault(); if (isAdmin) onToggleAdmin(); }}>
          <Sparkles size={28} />
          <span>AURA<span className="gradient-text">STORE</span></span>
        </a>

        {!isAdmin && (
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder={t.searchPlaceholder || "Search products, categories or specs..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        <div className="nav-actions">
          {/* Language Switcher */}
          <button
            className="nav-btn"
            onClick={() => setLang(lang === 'EN' ? 'TR' : 'EN')}
            title="Switch Language (EN / TR)"
            style={{ fontSize: '0.8rem', fontWeight: 800, width: 'auto', padding: '0 0.6rem', gap: '0.3rem' }}
          >
            <Globe size={16} />
            <span>{lang}</span>
          </button>

          {/* Currency Switcher */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              padding: '0.4rem 0.6rem',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="TRY">₺ TRY</option>
          </select>

          {/* Admin Panel Toggle */}
          <button
            className="btn-primary"
            onClick={onToggleAdmin}
            style={{
              padding: '0.45rem 0.9rem',
              fontSize: '0.85rem',
              background: isAdmin ? 'var(--accent-rose)' : 'var(--gradient-brand)'
            }}
          >
            <LayoutDashboard size={16} />
            <span>{isAdmin ? "Back to Store" : "Admin Panel"}</span>
          </button>

          <button
            className="nav-btn"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {!isAdmin && (
            <>
              <button className="nav-btn" title="Wishlist">
                <Heart size={20} />
                {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
              </button>

              <button className="nav-btn" onClick={onOpenCart} title="My Cart">
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
