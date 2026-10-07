import React, { useState, useEffect } from 'react';
import { Heart, User, ShoppingBag, ExternalLink, Info } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

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
const displayedPromos = currentView === 'saved' ? promos.filter(promo => savedPromos.includes(promo.id)) : promos;

  return (
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#FCFBF9', minHeight: '100vh', color: '#2C2C2C' }}>
      
      {/* Header */}
      <header style={{ backgroundColor: '#FFFFFF', padding: '1rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EAEAEA', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <ShoppingBag size={22} color="#2C2C2C" />
          <h1 onClick={() => setCurrentView('home')} style={{ margin: 0, fontSize: '1.6rem', fontFamily: "'Playfair Display', serif", fontWeight: '700', letterSpacing: '0.5px', cursor: 'pointer' }}>
            Malvinka
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <button style={navButtonStyle}>
            <Heart size={18} />
            <span>Saved ({savedPromos.length})</span>
          </button>
          {/*
         <button 
            onClick={() => setCurrentView('saved')}
            style={{ ...navButtonStyle, backgroundColor: currentView === 'saved' ? '#F5F5F5' : 'transparent', border: '1px solid #EAEAEA' }}>
            <Heart size={18} fill={currentView === 'saved' ? '#D9534F' : 'none'} color={currentView === 'saved' ? '#D9534F' : '#2C2C2C'} />
            <span>Saved ({savedPromos.length})</span>
          </button>
          */}
        </div>
      </header>

     {(currentView === 'home' || currentView === 'saved') && (
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
          
          {/* Editorial Founder Block */}
          <div style={{ textAlign: 'center', margin: '2rem 0 4rem 0', padding: '0 2rem' }}>
            <h2 style={{ fontSize: '2.75rem', fontFamily: "'Playfair Display', serif", fontWeight: '500', marginBottom: '1.5rem', color: '#1A1A1A' }}>
              {currentView === 'saved' ? 'Your Saved Edits' : 'The Autumn Wool Edit'}
            </h2>
            {currentView === 'home' && (
              <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto' }}>
                Curated in Toronto, Malvinka brings the finest European boutique finds directly to discerning parents. Inspired by the meticulous search for premium, lasting pieces for Malvina, our dashboard aggregates exclusive promotions so you can build a heritage wardrobe effortlessly.
              </p>
            )}
          </div>

          {/* FTC Disclosure */}
          <div style={{ backgroundColor: '#FFFFFF', padding: '1rem 1.5rem', borderRadius: '6px', border: '1px solid #EAEAEA', marginBottom: '3rem', fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.75rem', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <Info size={16} color="#999" />
            <span><strong>Affiliate Disclosure:</strong> Malvinka is a curated deal dashboard. We may earn a commission if you purchase through our affiliate links.</span>
          </div>

          {/* Promotions Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {displayedPromos.length === 0 ? (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', padding: '3rem', fontStyle: 'italic' }}>
                {currentView === 'saved' ? "You haven't saved any items yet." : "Curating the latest boutique arrivals..."}
              </p>
            ) : (
              displayedPromos.map((promo) => (
                <div key={promo.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', border: '1px solid #F0F0F0', transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'pointer' }}
                     onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.06)'; }}
                     onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  
                  <div style={{ height: '350px', width: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#F9F9F9' }}>
                    <img src={promo.imageUrl} alt={promo.brand} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      onClick={() => toggleSave(promo.id)}
                      style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.1s' }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                      <Heart size={18} color={savedPromos.includes(promo.id) ? '#D9534F' : '#999'} fill={savedPromos.includes(promo.id) ? '#D9534F' : 'none'} />
                    </button>
                  </div>

                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', fontFamily: "'Playfair Display', serif", fontWeight: '600', color: '#1A1A1A' }}>{promo.brand}</h3>
                    <p style={{ margin: '0 0 1.5rem 0', color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>{promo.product}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F0F0F0', paddingTop: '1.25rem' }}>
                      <span style={{ fontWeight: '500', fontSize: '0.85rem', color: '#D9534F' }}>{promo.offer}</span>
                      <a href={promo.link} style={{ backgroundColor: '#1A1A1A', color: '#FFFFFF', textDecoration: 'none', padding: '0.6rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '500', transition: 'background-color 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
                         onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333333'}
                         onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1A1A1A'}>
                        Shop <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      )}

      {currentView === 'privacy' && <PrivacyPolicy />}
      {currentView === 'terms' && <TermsOfService />}

      <footer style={{ marginTop: '5rem', padding: '3rem 2rem', borderTop: '1px solid #EAEAEA', textAlign: 'center', fontSize: '0.85rem', color: '#888', backgroundColor: '#FFFFFF' }}>
        <p style={{ marginBottom: '1.5rem' }}>Malvinka may earn a commission on purchases made through our curated links.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <span onClick={() => setCurrentView('privacy')} style={{ color: '#666', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#1A1A1A'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Privacy Policy</span>
          <span onClick={() => setCurrentView('terms')} style={{ color: '#666', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#1A1A1A'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Terms of Service</span>
          <a href="mailto:hello@malvinka.ca" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#1A1A1A'} onMouseLeave={(e) => e.currentTarget.style.color = '#666'}>Contact Us</a>
        </div>
      </footer>
    </div>
  );
}

// Reusable inline styles
const navButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: 'none',
  color: '#2C2C2C',
  fontWeight: '500',
  fontSize: '0.9rem',
  cursor: 'pointer',
  padding: '8px 16px',
  borderRadius: '20px',
  transition: 'all 0.2s ease'
};
