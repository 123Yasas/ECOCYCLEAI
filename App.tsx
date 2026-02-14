
import React, { useState, useEffect, useMemo } from 'react';
import { Role, Product, UserBadge, CompletedProject, Language } from './types';
import { INITIAL_BADGES, MOCK_PRODUCTS } from './constants';
import UserLogin from './views/UserLogin';
import SellerLogin from './views/SellerLogin';
import UserDashboard from './views/UserDashboard';
import SellerDashboard from './views/SellerDashboard';
import LeafBackground from './components/LeafBackground';

const App: React.FC = () => {
  const [role, setRole] = useState<Role | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [badges] = useState<UserBadge[]>(INITIAL_BADGES);
  const [userProjects, setUserProjects] = useState<CompletedProject[]>([
    { id: 'up1', name: 'Eco Bottle Vase', imageUrl: 'https://picsum.photos/seed/vase/200/200', date: '2024-05-10' }
  ]);

  const handleLogin = (userRole: Role) => {
    setRole(userRole);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ta' : 'en');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Global Header for Language Switch */}
      <div className="fixed top-4 right-4 z-[60]">
        <button 
          onClick={toggleLanguage}
          className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-green-100 font-bold text-green-600 hover:bg-green-50 transition-all flex items-center space-x-2"
        >
          <span>🌐</span>
          <span>{lang === 'en' ? 'English' : 'தமிழ்'}</span>
        </button>
      </div>

      {!isLoggedIn ? (
        !role ? (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-12 eco-gradient relative overflow-hidden">
            <LeafBackground />
            
            <div className="text-center text-white space-y-4 relative z-10">
              <div className="inline-block bg-white/10 backdrop-blur-md p-6 rounded-[3rem] border border-white/20 mb-4 floating">
                <h1 className="text-7xl font-bold font-heading drop-shadow-2xl">EcoCycleAI</h1>
              </div>
              <p className="text-2xl font-medium opacity-90 max-w-lg mx-auto leading-relaxed">
                {lang === 'en' ? 'Transforming waste into wonder!' : 'கழிவுகளை அற்புதங்களாக மாற்றுகிறோம்!'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
              <button 
                onClick={() => setRole('user')}
                className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border-2 border-white/40 hover:bg-white/20 transition-all transform hover:scale-105 group text-left shadow-2xl"
              >
                <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform">🌍</div>
                <h3 className="text-3xl font-bold text-white mb-2">{lang === 'en' ? "I'm an Eco Hero" : 'நான் ஒரு சுற்றுச்சூழல் ஹீரோ'}</h3>
                <p className="text-white/80 text-lg leading-snug">{lang === 'en' ? 'I want to scan waste and learn to reuse.' : 'நான் கழிவுகளை ஸ்கேன் செய்து மீண்டும் பயன்படுத்த விரும்புகிறேன்.'}</p>
              </button>
              
              <button 
                onClick={() => setRole('seller')}
                className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border-2 border-white/40 hover:bg-white/20 transition-all transform hover:scale-105 group text-left shadow-2xl"
              >
                <div className="bg-white/20 w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
                <h3 className="text-3xl font-bold text-white mb-2">{lang === 'en' ? "I'm a Creator" : 'நான் ஒரு படைப்பாளி'}</h3>
                <p className="text-white/80 text-lg leading-snug">{lang === 'en' ? 'I want to showcase and sell my upcycled work.' : 'எனது மறுசுழற்சி செய்யப்பட்ட வேலையைக் காட்டி விற்க விரும்புகிறேன்.'}</p>
              </button>
            </div>
            
            {/* Decorative base wave */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
          </div>
        ) : role === 'user' ? (
          <UserLogin onLogin={() => handleLogin('user')} onBack={() => setRole(null)} />
        ) : (
          <SellerLogin onLogin={() => handleLogin('seller')} onBack={() => setRole(null)} />
        )
      ) : role === 'user' ? (
        <UserDashboard 
          onLogout={handleLogout} 
          badges={badges} 
          projects={userProjects} 
          marketplaceProducts={products}
          lang={lang}
        />
      ) : (
        <SellerDashboard 
          onLogout={handleLogout} 
          onAddProduct={addProduct} 
        />
      )}
    </div>
  );
};

export default App;
