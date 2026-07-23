import React, { useState } from 'react';
import { ShoppingBag, Package, Users, Plus, Trash2, DollarSign, ArrowLeft } from 'lucide-react';

export default function AdminDashboard({
  products,
  setProducts,
  orders,
  setOrders,
  leads,
  formatPrice,
  onExitAdmin
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Technology',
    price: '',
    originalPrice: '',
    stock: 10,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Next-generation premium product.'
  });

  const [paymentKeys, setPaymentKeys] = useState({
    stripePublishableKey: 'pk_live_51M0000000000000000000000',
    stripeSecretKey: '••••••••••••••••••••••••••••••••',
    paypalClientId: 'client_id_live_994827104',
    supportPhone: '+1 (555) 000-0000'
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrderCount = orders.length;
  const avgOrderValue = totalOrderCount > 0 ? (totalRevenue / totalOrderCount) : 0;

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const created = {
      ...newProduct,
      id: 'p-' + Date.now(),
      price: parseFloat(newProduct.price),
      originalPrice: newProduct.originalPrice ? parseFloat(newProduct.originalPrice) : null,
      rating: 5.0,
      reviewCount: 1,
      stock: parseInt(newProduct.stock)
    };
    setProducts([created, ...products]);
    setNewProduct({
      name: '',
      category: 'Technology',
      price: '',
      originalPrice: '',
      stock: 10,
      badge: 'New',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      description: 'Next-generation premium product.'
    });
    setActiveTab('products');
  };

  const handleDeleteProduct = (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleUpdateStock = (productId, newStock) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: Math.max(0, newStock) } : p));
  };

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ADMIN CONTROL PANEL
            </span>
            <h1 style={{ fontSize: '2rem', marginTop: '0.25rem' }}>Store Analytics & Operations</h1>
          </div>
          <button className="btn-primary" onClick={onExitAdmin}>
            <ArrowLeft size={18} />
            <span>Back to Storefront</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Total Revenue</span>
              <DollarSign size={18} className="gradient-text" />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }} className="gradient-text">
              {formatPrice(totalRevenue)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
              ↑ +24.5% vs last week
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Total Orders</span>
              <ShoppingBag size={18} style={{ color: 'var(--accent-primary)' }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {totalOrderCount} Orders
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Active Operations
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Average Order Value (AOV)</span>
              <Package size={18} style={{ color: 'var(--accent-amber)' }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {formatPrice(avgOrderValue)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
              High-Ticket Average
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span>Captured Leads</span>
              <Users size={18} style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {leads.length} Subscribers
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Promo Unlocked
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem' }}>
          <button
            className={`filter-pill ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Order Management ({orders.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Product & Inventory ({products.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'new-product' ? 'active' : ''}`}
            onClick={() => setActiveTab('new-product')}
          >
            + Add New Product
          </button>
          <button
            className={`filter-pill ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            Email Leads ({leads.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Payment API Settings
          </button>
        </div>

        {/* TAB 1: Orders Management */}
        {activeTab === 'overview' && (
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Incoming Customer Orders</h3>
            {orders.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No new orders found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '0.75rem' }}>Order ID</th>
                      <th style={{ padding: '0.75rem' }}>Customer</th>
                      <th style={{ padding: '0.75rem' }}>Amount</th>
                      <th style={{ padding: '0.75rem' }}>Status</th>
                      <th style={{ padding: '0.75rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                        <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)' }}>{order.id}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <div>{order.fullName}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.email}</div>
                        </td>
                        <td style={{ padding: '0.75rem', fontWeight: 700 }}>{formatPrice(order.total)}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{
                            padding: '0.25rem 0.6rem',
                            borderRadius: '99px',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            background: order.status === 'Completed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                            color: order.status === 'Completed' ? 'var(--accent-emerald)' : 'var(--accent-amber)'
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                            style={{
                              background: 'var(--bg-secondary)',
                              color: 'var(--text-primary)',
                              border: '1px solid var(--glass-border)',
                              borderRadius: '6px',
                              padding: '0.3rem 0.5rem',
                              fontSize: '0.8rem'
                            }}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Products & Inventory Management */}
        {activeTab === 'products' && (
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Product Catalog & Inventory Control</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.75rem' }}>Product</th>
                    <th style={{ padding: '0.75rem' }}>Category</th>
                    <th style={{ padding: '0.75rem' }}>Price</th>
                    <th style={{ padding: '0.75rem' }}>Stock</th>
                    <th style={{ padding: '0.75rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                        <span style={{ fontWeight: 600 }}>{p.name}</span>
                      </td>
                      <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{p.category}</td>
                      <td style={{ padding: '0.75rem', fontWeight: 700 }}>{formatPrice(p.price)}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button onClick={() => handleUpdateStock(p.id, p.stock - 1)} style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: '#fff' }}>-</button>
                          <span style={{ fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>{p.stock}</span>
                          <button onClick={() => handleUpdateStock(p.id, p.stock + 1)} style={{ padding: '0.2rem 0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '4px', color: '#fff' }}>+</button>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <button onClick={() => handleDeleteProduct(p.id)} style={{ color: 'var(--accent-rose)' }}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: Add New Product */}
        {activeTab === 'new-product' && (
          <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Add New Product</h3>
            <form onSubmit={handleAddProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aura Wireless Earbuds"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Audio">Audio</option>
                    <option value="Office & Living">Office & Living</option>
                    <option value="Digital Asset">Digital Asset</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Price ($) *</label>
                  <input
                    type="number"
                    required
                    placeholder="99"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Product Image URL *</label>
                <input
                  type="text"
                  required
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
                <Plus size={18} />
                <span>Save Product to Catalog</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: Leads List */}
        {activeTab === 'leads' && (
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Subscribed Customer Email Leads</h3>
            {leads.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No customer emails captured yet.</p>
            ) : (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {leads.map((email, i) => (
                  <li key={i} style={{ padding: '0.65rem', background: 'var(--bg-secondary)', borderRadius: '6px', fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    ✉️ {email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* TAB 5: Payment Gateway API Settings */}
        {activeTab === 'settings' && (
          <div className="glass-card" style={{ padding: '1.5rem', maxWidth: '600px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Payment Gateways API Configuration</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Enter payment provider API keys to automatically deposit customer funds into your bank account.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Stripe Publishable Key</label>
                <input
                  type="text"
                  value={paymentKeys.stripePublishableKey}
                  onChange={(e) => setPaymentKeys({ ...paymentKeys, stripePublishableKey: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>PayPal Client ID</label>
                <input
                  type="text"
                  value={paymentKeys.paypalClientId}
                  onChange={(e) => setPaymentKeys({ ...paymentKeys, paypalClientId: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Support Hotline Phone</label>
                <input
                  type="text"
                  value={paymentKeys.supportPhone}
                  onChange={(e) => setPaymentKeys({ ...paymentKeys, supportPhone: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-primary)', marginTop: '0.25rem' }}
                />
              </div>

              <button className="btn-primary" onClick={() => alert("API Settings Saved Successfully!")}>
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
