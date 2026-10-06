import React, { useState, useEffect } from 'react';
import { Heart, User, ShoppingBag, ExternalLink, Info } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import PrivacyPolicy from './PrivacyPolicy';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedPromos, setSavedPromos] = useState<string[]>([]);
  const [promos, setPromos] = useState<any[]>([]);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "promotions"));
        const promosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPromos(promosData);
      } catch (error) {
        console.error("Error fetching inventory: ", error);
      }
    };

    fetchPromos();
  }, []);

  const toggleSave = (id: string) => {
    if (savedPromos.includes(id)) {
      setSavedPromos(savedPromos.filter(promoId => promoId !== id));
    } else {
      setSavedPromos([...savedPromos, id]);
    }
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

      {currentView === 'home' && (
        <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
          
          {/* Editorial Founder Block */}
          <div style={{ textAlign: 'center', margin: '2rem 0 4rem 0', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontFamily: "'Playfair Display', serif", fontWeight: '600', marginBottom: '1rem' }}>
              The Autumn Wool Edit
            </h2>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              Curated in Toronto, Malvinka brings the finest European boutique finds directly to discerning parents. Inspired by the meticulous search for premium, lasting pieces for Мальвина, our dashboard aggregates exclusive promotions so you can build a heritage wardrobe effortlessly.
            </p>
          </div>

          {/* FTC Disclosure */}
          <div style={{ backgroundColor: '#ffe5ec', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={16} />
            <span><strong>Affiliate Disclosure:</strong> Malvinka is a curated deal dashboard. We may earn a commission if you purchase through our affiliate links.</span>
          </div>

          {/* Promotions Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {promos.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', padding: '3rem' }}>Curating the latest boutique arrivals...</p>
            ) : (
              promos.map((promo) => (
                <div key={promo.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                  
                  <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
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
                      <span style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.9rem' }}>{promo.offer}</span>
                      <a href={promo.link} style={{ backgroundColor: '#2C2C2C', color: 'white', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        Shop <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
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
