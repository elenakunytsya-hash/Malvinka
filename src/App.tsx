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

export default function App() {
  const [currentView, setCurrentView] = useState('home');
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

      {currentView === 'home' && (
        <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
          
          {/* FTC Disclosure */}
          <div style={{ backgroundColor: '#ffe5ec', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5
