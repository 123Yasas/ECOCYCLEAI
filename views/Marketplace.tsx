
import React, { useState } from 'react';
import { Product, Language } from '../types';
import Avatar from '../components/Avatar';

interface MarketplaceProps {
  products: Product[];
  onBack: () => void;
  lang: Language;
}

const LEADERBOARD = [
  { name: 'EcoWarrior', points: 1200, badge: '🏆', rank: 'Reuse Champion' },
  { name: 'UpcycleQueen', points: 950, badge: '🎨', rank: 'Top Seller' },
  { name: 'PlasticSaver', points: 800, badge: '🌍', rank: 'Eco Hero' }
];

const Marketplace: React.FC<MarketplaceProps> = ({ products, onBack, lang }) => {
  const [buyingProduct, setBuyingProduct] = useState<Product | null>(null);

  const t = {
    en: {
      title: "Upcycle Market",
      leaderboard: "Leaderboard",
      buy: "Buy Now",
      points: "Points",
      back: "Back"
    },
    ta: {
      title: "மறுசுழற்சி சந்தை",
      leaderboard: "முன்னணி பட்டியல்",
      buy: "இப்போது வாங்கு",
      points: "புள்ளிகள்",
      back: "பின்செல்"
    }
  }[lang];

  return (
    <div className="min-h-screen bg-[#FFFDF0] pb-20">
      <div className="bg-yellow-400 px-6 py-8 text-center rounded-b-[3rem] shadow-lg relative overflow-hidden">
        <button onClick={onBack} className="absolute top-6 left-6 font-bold text-yellow-900 bg-white/50 px-4 py-2 rounded-full shadow-sm hover:bg-white/80 transition-all">
          {t.back}
        </button>
        <h1 className="text-3xl font-bold font-heading text-yellow-900 mb-1">{t.title} 🛍️</h1>
      </div>

      <main className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Leaderboard Section */}
        <section className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-yellow-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <span>🏆</span> <span>{t.leaderboard}</span>
          </h2>
          <div className="space-y-3">
            {LEADERBOARD.map((user, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-yellow-50 rounded-2xl">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{user.badge}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                    <p className="text-[10px] text-yellow-700 font-bold uppercase">{user.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-yellow-600">{user.points} {t.points}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              <div className="relative h-40">
                <img src={product.imageUrl} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 font-bold text-[10px] px-2 py-1 rounded-full">
                  ${product.price}
                </div>
              </div>
              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <h3 className="text-sm font-bold text-gray-800 truncate">{product.name}</h3>
                <p className="text-[10px] text-gray-400 line-clamp-2">{product.description}</p>
                <button 
                  onClick={() => setBuyingProduct(product)}
                  className="w-full bg-yellow-100 text-yellow-700 font-bold py-2 rounded-xl text-[10px] hover:bg-yellow-200 transition-colors mt-auto"
                >
                  {t.buy}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {buyingProduct && (
        <div className="fixed inset-0 bg-yellow-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full text-center space-y-6 shadow-2xl border-4 border-yellow-100">
            <div className="text-5xl">🎁</div>
            <h2 className="text-xl font-bold text-gray-800">Confirm Order</h2>
            <p className="text-sm text-gray-500">
              Buy <span className="font-bold">"{buyingProduct.name}"</span> for <span className="font-bold">${buyingProduct.price}</span>?
            </p>
            <div className="flex gap-4">
              <button onClick={() => setBuyingProduct(null)} className="flex-1 py-3 font-bold text-gray-400">Cancel</button>
              <button onClick={() => { alert('Success!'); setBuyingProduct(null); }} className="flex-1 bg-yellow-400 text-yellow-900 font-bold py-3 rounded-2xl shadow-lg">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
