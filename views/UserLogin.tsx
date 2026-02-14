
import React, { useState } from 'react';
import LeafBackground from '../components/LeafBackground';

interface UserLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const UserLogin: React.FC<UserLoginProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) onLogin();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 eco-gradient overflow-hidden relative">
      <LeafBackground />
      
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl floating"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl floating" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 relative z-10 border-8 border-green-100">
        <button onClick={onBack} className="absolute top-6 left-6 text-green-600 hover:text-green-800 font-bold transition-colors">
          ← Back
        </button>
        
        <div className="text-center mb-8 pt-6">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-4xl font-bold font-heading text-green-600 mb-2">Welcome Eco Hero!</h2>
          <p className="text-gray-500 font-medium italic">Let’s reuse and save Earth!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-green-700 font-bold mb-2 ml-1">Hero Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hero@earth.com"
              className="w-full px-6 py-4 rounded-2xl bg-green-50 border-2 border-green-100 focus:border-green-400 focus:outline-none transition-all"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg transform hover:scale-[1.02] transition-all"
          >
            Start Mission! 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
