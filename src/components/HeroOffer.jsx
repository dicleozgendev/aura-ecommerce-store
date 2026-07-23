import React from 'react';
import { ArrowRight, Flame, Shield, Star } from 'lucide-react';

export default function HeroOffer({ onSelectProduct, formatPrice }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-card">
          <div className="hero-content">
            <div className="hero-tag">
              <Flame size={16} />
              <span>FEATURED DEAL OF THE WEEK</span>
            </div>
            <h1 className="hero-title">
              Experience Tomorrow's <br />
              <span className="gradient-text">Technology Today</span>
            </h1>
            <p className="hero-subtitle">
              Enjoy 4K Micro-OLED cinematic visuals and real-time voice translation with the AI-powered Aura Vision Pro AR Glasses. Limited stock available!
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                className="btn-primary"
                onClick={() => onSelectProduct("p1")}
              >
                <span>Shop Now & Explore</span>
                <ArrowRight size={18} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)' }}>
                <Star size={18} fill="currentColor" />
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>4.9/5</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>(342 Verified Reviews)</span>
              </div>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <h4>4,800+</h4>
                <p>Happy Customers</p>
              </div>
              <div className="stat-item">
                <h4>99.4%</h4>
                <p>Satisfaction Rate</p>
              </div>
              <div className="stat-item">
                <h4>24h</h4>
                <p>Express Dispatch</p>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <img
              src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80"
              alt="Aura Vision Pro AR Glasses"
            />
            <div className="urgency-badge">
              <Shield size={22} style={{ color: 'var(--accent-amber)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Stock Status</div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-amber)' }}>Only 4 Units Left!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
