import React, { useState, useEffect } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import HeroOffer from './components/HeroOffer';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginModal from './components/AdminLoginModal';
import AIRecommenderWidget from './components/AIRecommenderWidget';
import SocialProofToast from './components/SocialProofToast';
import LeadPopup from './components/LeadPopup';
import Footer from './components/Footer';
import { PRODUCTS_DATA } from './data/products';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('EN');
  const [currency, setCurrency] = useState('USD');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAdmin, setIsAdmin] = useState(false);

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('aura_products');
    return saved ? JSON.parse(saved) : PRODUCTS_DATA;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('aura_orders');
    return saved ? JSON.parse(saved) : [
      { id: 'AUR-492102', fullName: 'John Doe', email: 'john@example.com', total: 249, status: 'Completed' },
      { id: 'AUR-582910', fullName: 'Sarah Connor', email: 'sarah@example.com', total: 129, status: 'Shipped' },
      { id: 'AUR-918234', fullName: 'David Miller', email: 'david@example.com', total: 499, status: 'Processing' }
    ];
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('aura_leads');
    return saved ? JSON.parse(saved) : ['john@example.com', 'sarah@example.com', 'david@example.com'];
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('aura_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('aura_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('aura_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aura_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    TRY: { symbol: '₺', rate: 36.5 }
  };

  const formatPrice = (amountInUSD) => {
    const { symbol, rate } = currencyRates[currency] || currencyRates['USD'];
    const converted = amountInUSD * rate;
    if (currency === 'TRY') {
      return `${converted.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺`;
    }
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCart(prevCart => prevCart.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleHeroSelectProduct = (id) => {
    const prod = products.find(p => p.id === id);
    if (prod) setQuickViewProduct(prod);
  };

  const handleLeadCaptured = (couponObj) => {
    setAppliedCoupon(couponObj);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const cartTotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = appliedCoupon ? (cartTotalAmount * 0.1) : 0;
  const finalCheckoutAmount = Math.max(0, cartTotalAmount - discountAmount);

  return (
    <div className="app-root">
      <AnnouncementBar />

      <Navbar
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        theme={theme}
        toggleTheme={toggleTheme}
        currency={currency}
        setCurrency={setCurrency}
        lang={lang}
        setLang={setLang}
        isAdmin={isAdmin}
        onToggleAdmin={() => {
          if (isAdmin) {
            setIsAdmin(false);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {isAdmin ? (
        <AdminDashboard
          products={products}
          setProducts={setProducts}
          orders={orders}
          setOrders={setOrders}
          leads={leads}
          formatPrice={formatPrice}
          onExitAdmin={() => setIsAdmin(false)}
        />
      ) : (
        <main>
          <HeroOffer
            onSelectProduct={handleHeroSelectProduct}
            formatPrice={formatPrice}
          />

          <AIRecommenderWidget
            products={products}
            onAddToCart={handleAddToCart}
            formatPrice={formatPrice}
          />

          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            formatPrice={formatPrice}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </main>
      )}

      <Footer />

      {/* Modals & Drawers */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => setIsAdmin(true)}
      />

      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        formatPrice={formatPrice}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveFromCart}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        formatPrice={formatPrice}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        totalAmount={finalCheckoutAmount}
        formatPrice={formatPrice}
        onClearCart={() => setCart([])}
      />

      <SocialProofToast />

      <LeadPopup
        onApplyCoupon={handleLeadCaptured}
      />
    </div>
  );
}
