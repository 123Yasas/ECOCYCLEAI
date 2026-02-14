
import React, { useState } from 'react';
import { Product } from '../types';

interface SellerDashboardProps {
  onLogout: () => void;
  onAddProduct: (product: Product) => void;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ onLogout, onAddProduct }) => {
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    videoUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      imageUrl: newProduct.imageUrl || 'https://picsum.photos/seed/' + Math.random() + '/400/300',
      videoUrl: newProduct.videoUrl,
      sellerName: 'Creative Creator'
    });
    setShowForm(false);
    setNewProduct({ name: '', description: '', price: '', imageUrl: '', videoUrl: '' });
  };

  return (
    <div className="min-h-screen bg-purple-50 pb-20">
      <nav className="bg-white px-6 py-4 shadow-sm flex justify-between items-center sticky top-0 z-50 border-b-4 border-purple-100">
        <h2 className="text-2xl font-bold font-heading text-purple-600">Creator Studio</h2>
        
        {/* Styled Logout Button for Seller Dashboard */}
        <div className="flex items-center space-x-4 mr-24">
          <button 
            onClick={onLogout} 
            className="bg-red-50 text-red-500 font-bold px-4 py-2 rounded-2xl border border-red-100 hover:bg-red-100 transition-all text-sm flex items-center space-x-2 shadow-sm"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-12">
        <header className="maker-gradient p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h1 className="text-5xl font-bold font-heading">Your Creative Hub ✨</h1>
            <p className="text-xl opacity-90 max-w-2xl">The world needs your recycled art. Upload your work and start selling to Eco Heroes everywhere!</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-white text-purple-600 font-bold px-10 py-5 rounded-3xl shadow-xl hover:scale-105 transition-all text-xl"
            >
              + List New Creation
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 text-[15rem] opacity-20 transform rotate-12">🎨</div>
        </header>

        {showForm && (
          <div className="fixed inset-0 bg-purple-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 relative border-8 border-purple-100">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-purple-600 text-3xl transition-colors"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold font-heading text-purple-600 mb-8 text-center">Create Listing</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-bold text-gray-700 ml-2">Product Name</label>
                    <input 
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-purple-100 focus:border-purple-400 focus:outline-none"
                      placeholder="e.g. Magic Bottle Lamp"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold text-gray-700 ml-2">Price ($)</label>
                    <input 
                      type="number" 
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-purple-100 focus:border-purple-400 focus:outline-none"
                      placeholder="19.99"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="font-bold text-gray-700 ml-2">Description</label>
                  <textarea 
                    required
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-purple-100 focus:border-purple-400 focus:outline-none"
                    placeholder="Tell the story of your creation..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-gray-700 ml-2">Image Link (Mock)</label>
                  <input 
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({...newProduct, imageUrl: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-purple-100 focus:border-purple-400 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full maker-gradient text-white font-bold py-5 rounded-[2rem] shadow-xl hover:scale-[1.02] transition-all text-xl mt-4"
                >
                  Publish Creation ✨
                </button>
              </form>
            </div>
          </div>
        )}

        <section className="space-y-8">
          <h2 className="text-4xl font-bold font-heading text-purple-600">Your Active Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[3rem] p-6 shadow-xl border-4 border-dashed border-purple-200 flex flex-col items-center justify-center space-y-4 min-h-[400px] group hover:bg-purple-50 transition-all cursor-pointer" onClick={() => setShowForm(true)}>
               <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">✨</div>
               <p className="text-xl font-bold text-purple-400">Add New Item</p>
            </div>
            {/* Seller's items would go here in a real app */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;
