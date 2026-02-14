
import React, { useState } from 'react';
import LeafBackground from '../components/LeafBackground';

interface SellerLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const SellerLogin: React.FC<SellerLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 maker-gradient overflow-hidden relative">
      <LeafBackground />
      
      <div className="absolute top-10 right-10 w-24 h-24 bg-purple-400/20 rounded-full blur-xl floating"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-pink-400/20 rounded-full blur-xl floating" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 relative z-10 border-8 border-purple-100">
        <button onClick={onBack} className="absolute top-6 left-6 text-purple-600 hover:text-purple-800 font-bold transition-colors">
          ← Back
        </button>
        
        <div className="text-center mb-8 pt-6">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-4xl font-bold font-heading text-purple-600 mb-2">Welcome Creator!</h2>
          <p className="text-gray-500 font-medium italic">Showcase and sell your reused creations!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-purple-700 font-bold mb-2 ml-1">Creator Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="artist@maker.com"
              className="w-full px-6 py-4 rounded-2xl bg-purple-50 border-2 border-purple-100 focus:border-purple-400 focus:outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all"
          >
            Enter Studio ✨
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
