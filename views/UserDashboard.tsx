
import React, { useState } from 'react';
import { UserBadge, CompletedProject, Product, Language } from '../types';
import ScanProcess from './ScanProcess';
import Marketplace from './Marketplace';
import Avatar from '../components/Avatar';
import LeafBackground from '../components/LeafBackground';

interface UserDashboardProps {
  onLogout: () => void;
  badges: UserBadge[];
  projects: CompletedProject[];
  marketplaceProducts: Product[];
  lang: Language;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onLogout, badges, projects, marketplaceProducts, lang }) => {
  const [view, setView] = useState<'home' | 'scan' | 'buy'>('home');

  if (view === 'scan') return <ScanProcess onBack={() => setView('home')} lang={lang} />;
  if (view === 'buy') return <Marketplace products={marketplaceProducts} onBack={() => setView('home')} lang={lang} />;

  const t = {
    en: {
      welcome: "Hi Eco Hero!",
      sub: "What are we saving today?",
      scanPrimary: "Scan & Transform",
      scanSub: "Find reuse ideas for any item",
      market: "Upcycle Market",
      marketSub: "Buy unique green products",
      badges: "Your Achievements",
      gallery: "Your Gallery",
      logout: "Logout"
    },
    ta: {
      welcome: "வணக்கம் ஹீரோ!",
      sub: "இன்று நாம் எதைச் சேமிக்கிறோம்?",
      scanPrimary: "ஸ்கேன் & மாற்றம்",
      scanSub: "மறுபயன்பாட்டு யோசனைகளைக் கண்டறியவும்",
      market: "மறுசுழற்சி சந்தை",
      marketSub: "தனித்துவமான பொருட்களை வாங்கவும்",
      badges: "உங்களது சாதனைகள்",
      gallery: "உங்களது கேலரி",
      logout: "வெளியேறு"
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#F0F7F0] pb-20 relative overflow-hidden">
      <LeafBackground />
      
      {/* Navigation */}
      <nav className="bg-white/70 backdrop-blur-xl px-6 py-4 shadow-sm flex justify-between items-center sticky top-0 z-50 border-b border-green-100">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10" />
          <h2 className="text-xl font-bold font-heading text-green-600">EcoCycleAI</h2>
        </div>
        
        <div className="flex items-center space-x-4"> 
          <button 
            onClick={onLogout} 
            className="bg-red-50 text-red-500 font-bold px-4 py-2 rounded-2xl border border-red-100 hover:bg-red-100 transition-all text-sm flex items-center space-x-2 shadow-sm"
          >
            <span>🚪</span>
            <span>{t.logout}</span>
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 space-y-8 relative z-10">
        <header className="py-2">
          <h1 className="text-4xl font-bold text-gray-800 font-heading">{t.welcome}</h1>
          <p className="text-gray-500 text-lg font-medium">{t.sub}</p>
        </header>

        {/* Primary Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => setView('scan')}
            className="group relative bg-white p-8 rounded-[3rem] shadow-xl border-2 border-green-50 flex flex-col items-start text-left hover:border-green-400 transition-all transform hover:scale-[1.02] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-7xl opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform">🔍</div>
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:rotate-6 transition-transform">📸</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">{t.scanPrimary}</h3>
            <p className="text-green-600/70 font-medium">{t.scanSub}</p>
          </button>

          <button 
            onClick={() => setView('buy')}
            className="group relative bg-white p-8 rounded-[3rem] shadow-xl border-2 border-yellow-50 flex flex-col items-start text-left hover:border-yellow-400 transition-all transform hover:scale-[1.02] overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-7xl opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform">🛍️</div>
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:rotate-6 transition-transform">🛒</div>
            <h3 className="text-2xl font-bold text-yellow-800 mb-2">{t.market}</h3>
            <p className="text-yellow-700/70 font-medium">{t.marketSub}</p>
          </button>
        </div>

        {/* Badges Section */}
        <section className="bg-white/80 backdrop-blur-md rounded-[3rem] p-8 shadow-lg border border-white">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
            <span>🏆</span>
            <span>{t.badges}</span>
          </h2>
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {badges.map(badge => (
              <div key={badge.id} className="shrink-0 flex flex-col items-center space-y-2 group">
                <div className={`${badge.color} w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-md border-4 border-white group-hover:scale-110 transition-transform`}>
                  {badge.icon}
                </div>
                <span className="text-xs font-bold text-gray-500">{badge.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <span>🖼️</span>
            <span>{t.gallery}</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {projects.map(project => (
              <div key={project.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all">
                <div className="h-32 overflow-hidden">
                  <img src={project.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-bold text-gray-800 truncate">{project.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{project.date}</p>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setView('scan')} 
              className="bg-white/40 backdrop-blur-sm rounded-[2rem] border-4 border-dashed border-gray-200 flex flex-col items-center justify-center h-44 text-gray-400 hover:bg-white hover:border-green-300 hover:text-green-500 transition-all group"
            >
              <span className="text-4xl group-hover:scale-125 transition-transform">+</span>
              <span className="text-xs font-bold mt-2 uppercase tracking-widest">New Project</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
