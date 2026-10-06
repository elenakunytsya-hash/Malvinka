import React, { useState } from 'react';
import { Heart, User, ShoppingBag, Copy, ExternalLink, Shield, Info, Mail } from 'lucide-react';
import PrivacyPolicy from './PrivacyPolicy';
const MOCK_PROMOS = [
  {
    id: 1,
    brand: "Bonpoint",
    product: "Iconic Smocked Floral Dress",
    offer: "15% Off First App Purchase",
    imageUrl: "https://us.bonpoint.com/cdn/shop/files/260420_BONPOINT_F_1A_1_1872_df11b022-aa77-40a2-afbe-350a83a98eaf.jpg?crop=center&height=800&v=1782965933&width=600", 
    link: "#" 
  },
  {
    id: 2,
    brand: "Donsje",
    product: "Wadudu Leather Animal Booties",
    offer: "Free Worldwide Shipping",
    imageUrl: "https://donsje.com/cdn/shop/files/1028128_NL127_2.jpg?v=1765463095&width=535",
    link: "#"
  },
  {
    id: 3,
    brand: "Il Gufo",
    product: "Merino Wool Cardigan",
    offer: "End of Season Sale - Up to 30% Off",
imageUrl: "/il gufo.jpg",
  }
];

export default function App() {const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedPromos, setSavedPromos] = useState<number[]>([]);
  const [copiedCode, setCopiedCode] = useState('');

  const toggleSave = (id: number) => {
    if (savedPromos.includes(id)) {
      setSavedPromos(savedPromos.filter(promoId => promoId !== id));
    } else {
      setSavedPromos([...savedPromos, id]);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', backgroundColor: '#fff0f3', minHeight: '100vh', color: '#590d22' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#ffb3c6', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShoppingBag size={24} color="#590d22" />
         <h1 onClick={() => setCurrentView('home')} style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', cursor: 'pointer' }}>Malvinka</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={navButtonStyle}>
            <Heart size={20} />
            <span>Saved ({savedPromos.length})</span>
          </button>
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            style={{ ...navButtonStyle, backgroundColor: isLoggedIn ? '#ff8fab' : 'transparent', border: '1px solid #590d22' }}>
            <User size={20} />
            <span>{isLoggedIn ? 'My Account' : 'Sign In'}</span>
          </button>
        </div>
      </header>
{currentView === 'home' ? (
    
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* FTC Disclosure */}
        <div style={{ backgroundColor: '#ffe5ec', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Info size={16} />
          <span><strong>Affiliate Disclosure:</strong> Malvinka is a curated deal dashboard. We may earn a commission if you purchase through our affiliate links.</span>
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '300' }}>Curated Boutique Promotions</h2>

        {/* Promotions Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {MOCK_PROMOS.map((promo) => (
            <div key={promo.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              
              <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img src={promo.imageUrl} alt={promo.brand} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button 
                  onClick={() => toggleSave(promo.id)}
                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', border: 'none', borderRadius: '50%', padding: '8px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <Heart size={20} color={savedPromos.includes(promo.id) ? '#ff4d6d' : '#ccc'} fill={savedPromos.includes(promo.id) ? '#ff4d6d' : 'none'} />
                </button>
              </div>
<div style={{ padding: '2rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontFamily: "'Playfair Display', serif", fontWeight: '600' }}>{promo.brand}</h3>
                <p style={{ margin: '0 0 1.5rem 0', color: '#666', fontSize: '0.95rem', lineHeight: '1.4' }}>{promo.product}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9F8F6', padding: '1rem', borderRadius: '4px' }}>
                  <button style={{ width: '100%', backgroundColor: '#2C2C2C', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '6px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    Discover the Edit <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer style={{ marginTop: '4rem', padding: '2rem', borderTop: '1px solid #EAEAEA', textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
        <p>Malvinka may earn a commission on purchases made through our curated links.</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#888', textDecoration: 'none' }}>Terms of Service</a>
          <a href="mailto:hello@malvinka.ca" style={{ color: '#888', textDecoration: 'none' }}>Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

// Reusable inline styles
const navButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  background: 'none',
  border: 'none',
  color: '#590d22',
  fontWeight: '600',
  cursor: 'pointer',
  padding: '8px 12px',
  borderRadius: '6px',
  transition: 'background 0.2s'
};

const footerLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  color: '#590d22',
  textDecoration: 'none',
  fontSize: '0.9rem'
};
