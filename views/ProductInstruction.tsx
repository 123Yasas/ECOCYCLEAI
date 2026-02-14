
import React, { useState, useEffect } from 'react';
import { generateReuseInstructions } from '../services/gemini';
import { ReuseInstruction, Language, Tool } from '../types';

interface ProductInstructionProps {
  materialName: string;
  projectName: string;
  onBack: () => void;
  lang: Language;
  tools: Tool[];
}

const ProductInstruction: React.FC<ProductInstructionProps> = ({ materialName, projectName, onBack, lang, tools }) => {
  const [data, setData] = useState<ReuseInstruction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Fix: Added missing 'tools' and 'lang' arguments to match generateReuseInstructions signature
        const res = await generateReuseInstructions(materialName, projectName, tools, lang);
        setData(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [materialName, projectName, tools, lang]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-white">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-2xl font-bold font-heading text-purple-600">Generating Blueprint...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-purple-600 text-white p-12 text-center rounded-b-[4rem] shadow-xl relative overflow-hidden">
        <button onClick={onBack} className="absolute top-8 left-8 text-white font-bold hover:opacity-80">← Back</button>
        <h1 className="text-5xl font-bold font-heading mb-4">{data?.projectName}</h1>
        <p className="text-xl opacity-90">Transforming your {data?.material} into art!</p>
      </div>

      <div className="max-w-4xl mx-auto p-6 -mt-10">
        <div className="space-y-8">
          {data?.steps.map((step, idx) => (
            <div key={idx} className="bg-white rounded-[3rem] p-8 shadow-xl flex flex-col md:flex-row gap-8 items-center border-2 border-purple-50 hover:border-purple-200 transition-all">
              <div className="w-20 h-20 bg-purple-100 rounded-3xl flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-purple-600">{step.step}</span>
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-xl font-medium text-gray-800 leading-relaxed">{step.instruction}</p>
                <div className="bg-gray-100 h-48 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                   <img src={`https://picsum.photos/seed/${idx + (step.visualPrompt?.length || 0)}/400/200`} className="w-full h-full object-cover opacity-80" alt="visual aid" />
                </div>
              </div>
            </div>
          ))}

          <section className="bg-red-50 rounded-[3rem] p-10 border-4 border-red-100 shadow-lg">
            <h2 className="text-3xl font-bold font-heading text-red-600 mb-6 flex items-center space-x-3">
              <span>📺</span> <span>Learn on YouTube</span>
            </h2>
            <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden shadow-inner flex flex-col items-center justify-center p-6 text-center space-y-4">
              <p className="text-lg font-bold text-gray-500">Video Integration Guide</p>
              <a 
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data?.youtubeSearchQuery || '')}`}
                target="_blank"
                rel="noreferrer"
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition-all"
              >
                Watch Tutorials for "{projectName}"
              </a>
            </div>
          </section>

          <div className="text-center pt-8">
            <button 
              onClick={onBack}
              className="bg-green-500 text-white font-bold px-12 py-5 rounded-3xl shadow-xl hover:scale-105 transition-all text-xl"
            >
              Mark Project Completed ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInstruction;
