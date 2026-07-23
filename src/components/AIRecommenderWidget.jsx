import React, { useState } from 'react';
import { Sparkles, Bot, RefreshCw, ShoppingBag } from 'lucide-react';

export default function AIRecommenderWidget({ products, onAddToCart, formatPrice }) {
  const [userNeed, setUserNeed] = useState('gift');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState(products.slice(0, 2));

  const handleGenerateAI = (needType) => {
    setUserNeed(needType);
    setIsAnalyzing(true);
    setTimeout(() => {
      let filtered = [];
      if (needType === 'gift') {
        filtered = products.filter(p => p.category === 'Technology' || p.category === 'Wearables');
      } else if (needType === 'office') {
        filtered = products.filter(p => p.category === 'Office & Living');
      } else if (needType === 'audio') {
        filtered = products.filter(p => p.category === 'Audio');
      } else {
        filtered = products.filter(p => p.price < 150);
      }
      setRecommendations(filtered.slice(0, 2));
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <section className="container" style={{ margin: '2.5rem auto 1rem auto' }}>
      <div className="glass-card" style={{
        padding: '1.75rem',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(168, 85, 247, 0.12) 100%)',
        border: '1px solid var(--glass-border-glow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Bot size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                PREMIUM AI WIDGET
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Aura AI Smart Shopping Assistant</h3>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => handleGenerateAI('gift')}
              className={`filter-pill ${userNeed === 'gift' ? 'active' : ''}`}
            >
              🎁 Gift Ideas
            </button>
            <button
              onClick={() => handleGenerateAI('office')}
              className={`filter-pill ${userNeed === 'office' ? 'active' : ''}`}
            >
              💼 Office & Living
            </button>
            <button
              onClick={() => handleGenerateAI('audio')}
              className={`filter-pill ${userNeed === 'audio' ? 'active' : ''}`}
            >
              🎧 Premium Audio
            </button>
            <button
              onClick={() => handleGenerateAI('deal')}
              className={`filter-pill ${userNeed === 'deal' ? 'active' : ''}`}
            >
              🔥 Top Deals
            </button>
          </div>
        </div>

        {isAnalyzing ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--accent-primary)' }}>
            <RefreshCw size={28} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Aura AI is analyzing smart matches for your preference...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {recommendations.map(prod => (
              <div key={prod.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'var(--bg-secondary)',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--glass-border)'
              }}>
                <img src={prod.image} alt={prod.name} style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Sparkles size={12} />
                    <span>AI Smart Recommendation</span>
                  </div>
                  <h4 style={{ fontSize: '0.9rem', margin: '0.2rem 0' }}>{prod.name}</h4>
                  <div style={{ fontWeight: 800, color: 'var(--accent-primary)', fontSize: '0.95rem' }}>
                    {formatPrice(prod.price)}
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(prod)}
                  className="btn-primary"
                  style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                >
                  <ShoppingBag size={14} />
                  <span>Add</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
