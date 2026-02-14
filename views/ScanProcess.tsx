
import React, { useState, useRef } from 'react';
import { classifyMaterial } from '../services/gemini';
import { ClassificationResult, Language } from '../types';
import CreativeFlow from './CreativeFlow';
import DisposalGuide from './DisposalGuide';
import Avatar from '../components/Avatar';
import VoiceAssistant from '../components/VoiceAssistant';

interface ScanProcessProps {
  onBack: () => void;
  lang: Language;
}

const ScanProcess: React.FC<ScanProcessProps> = ({ onBack, lang }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [decision, setDecision] = useState<'creative' | 'disposal' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = {
    en: {
      title: "Identify Material",
      prompt: "Snap or Upload Image",
      sub: "Take a clear photo",
      analyzing: "Analyzing...",
      fact: "Did you know?",
      question: "What would you like to do?",
      creative: "Creative Reuse",
      disposal: "Disposal Guide",
      safe: "Safe to reuse!",
      warning: "Hazardous material!",
      nonReusable: "Non-Reusable"
    },
    ta: {
      title: "பொருளை அடையாளம் காணவும்",
      prompt: "புகைப்படம் எடுக்கவும்",
      sub: "தெளிவான படத்தை எடுக்கவும்",
      analyzing: "ஆராய்கிறது...",
      fact: "உங்களுக்குத் தெரியுமா?",
      question: "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
      creative: "படைப்பு மறுபயன்பாடு",
      disposal: "அகற்றும் வழிகாட்டி",
      safe: "மீண்டும் பயன்படுத்த பாதுகாப்பானது!",
      warning: "ஆபத்தான பொருள்!",
      nonReusable: "மீண்டும் பயன்படுத்த முடியாது"
    }
  }[lang];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const cleanBase64 = base64.split(',')[1];
      const data = await classifyMaterial(cleanBase64, lang);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing image.");
    } finally {
      setLoading(false);
    }
  };

  if (decision === 'creative' && result) {
    return <CreativeFlow 
      materialName={result.materialName} 
      onBack={() => setDecision(null)} 
      lang={lang} 
    />;
  }

  if (decision === 'disposal' && result) {
    return <DisposalGuide 
      result={result} 
      onBack={() => setDecision(null)} 
      lang={lang} 
    />;
  }

  const isHazardous = result?.classification === 'Hazardous';
  const isReusable = result?.classification === 'Reusable';

  return (
    <div className="min-h-screen bg-[#F8FBF8] p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-green-600 font-bold px-4 py-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-all border border-green-50">
            ← {lang === 'en' ? 'Back' : 'பின்செல்'}
          </button>
          <Avatar mood={loading ? 'thinking' : (result ? 'speaking' : 'happy')} className="w-12 h-12" />
        </div>

        {!image && !loading && (
          <div className="text-center py-10 space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-gray-800 font-heading">{t.title}</h1>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-8 border-dashed border-green-100 rounded-[4rem] p-16 bg-white flex flex-col items-center group cursor-pointer shadow-inner hover:bg-green-50/20 transition-all"
            >
              <div className="text-8xl mb-6 group-hover:scale-110 transition-transform">📸</div>
              <p className="text-xl font-bold text-green-700">{t.prompt}</p>
              <p className="text-sm text-gray-400 mt-2">{t.sub}</p>
            </div>
            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          </div>
        )}

        {loading && (
          <div className="text-center py-20 space-y-4">
            <div className="relative inline-block">
              <div className="w-16 h-16 border-4 border-green-100 border-t-green-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl">✨</div>
            </div>
            <p className="text-xl font-bold text-green-600 font-heading">{t.analyzing}</p>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500 pb-10">
            {/* Scanned Image Card */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-64 border-8 border-white">
              <img src={image!} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <h3 className="text-white text-2xl font-bold font-heading">{result.materialName}</h3>
              </div>
            </div>

            {/* Classification Status Card */}
            <div className={`p-6 rounded-[2rem] shadow-sm border-2 transition-colors ${
              isHazardous 
              ? 'bg-red-50 border-red-100' 
              : isReusable 
                ? 'bg-[#EBFDF1] border-[#D4F7DF]' 
                : 'bg-orange-50 border-orange-100'
            }`}>
              <div className="flex items-start space-x-4">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${isHazardous ? 'bg-red-500 text-white' : 'bg-[#56CC82] text-white'}`}>
                  {isHazardous ? <span className="text-2xl">⚠️</span> : <span className="text-2xl">✓</span>}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${isHazardous ? 'text-red-700' : 'text-[#2D7A4F]'}`}>
                    {isHazardous ? t.warning : isReusable ? t.safe : t.nonReusable}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{result.reason}</p>
                </div>
              </div>
            </div>

            {/* Fact Card */}
            <div className="bg-[#EFF6FF] p-6 rounded-[2rem] border-2 border-[#DBEAFE] shadow-sm relative">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-[#1E40AF] font-bold text-sm flex items-center space-x-2">
                  <span>💡</span> <span>{t.fact}</span>
                </h4>
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "{result.impactMessage}"
              </p>
              <div className="mt-4 flex justify-end">
                <VoiceAssistant text={`${t.fact}. ${result.impactMessage}`} lang={lang} />
              </div>
            </div>

            {/* Decision Prompt */}
            <div className="pt-4 space-y-4">
              <p className="text-center font-bold text-gray-400 text-sm uppercase tracking-wider">{t.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {!isHazardous && (
                  <button 
                    onClick={() => setDecision('creative')}
                    className="p-6 rounded-[2rem] font-bold shadow-lg transition-all transform hover:scale-[1.03] flex flex-col items-center justify-center space-y-3 bg-white border-2 border-purple-100 text-purple-600 group hover:bg-purple-50"
                  >
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform">🎨</div>
                    <span className="text-sm">{t.creative}</span>
                  </button>
                )}
                <button 
                  onClick={() => setDecision('disposal')}
                  className={`p-6 rounded-[2rem] font-bold shadow-lg transition-all transform hover:scale-[1.03] flex flex-col items-center justify-center space-y-3 border-2 group ${
                    isHazardous 
                    ? 'bg-blue-600 border-blue-400 text-white hover:bg-blue-700 col-span-full' 
                    : 'bg-white border-blue-100 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-12 transition-transform ${isHazardous ? 'bg-blue-500' : 'bg-blue-100'}`}>
                    ♻️
                  </div>
                  <span className="text-sm">{t.disposal}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanProcess;
