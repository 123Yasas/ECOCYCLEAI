
import React from 'react';
import { ClassificationResult, Language } from '../types';
import VoiceAssistant from '../components/VoiceAssistant';
import Avatar from '../components/Avatar';

interface DisposalGuideProps {
  result: ClassificationResult;
  onBack: () => void;
  lang: Language;
}

const DisposalGuide: React.FC<DisposalGuideProps> = ({ result, onBack, lang }) => {
  const t = {
    en: {
      title: "Safe Disposal Guide",
      steps: [
        "Empty and Rinse the container.",
        "Remove caps and separate labels.",
        "Check for the recycling symbol (1-7).",
        "Place in the designated BLUE collection bin."
      ],
      warning: "Environmental Warning",
      impact: "Improper disposal leads to microplastics in oceans and harms marine life.",
      btn: "Got it!",
      back: "Back"
    },
    ta: {
      title: "பாதுகாப்பான அகற்றும் வழிகாட்டி",
      steps: [
        "கொள்கலனை காலி செய்து துவைக்கவும்.",
        "மூடிகளை அகற்றி லேபிள்களை பிரிக்கவும்.",
        "மறுசுழற்சி சின்னத்தை (1-7) சரிபார்க்கவும்.",
        "குறிப்பிடப்பட்ட நீலநிற சேகரிப்பு தொட்டியில் போடவும்."
      ],
      warning: "சுற்றுச்சூழல் எச்சரிக்கை",
      impact: "தவறான முறையில் அகற்றுவது கடல்களில் நுண் பிளாஸ்டிக்குகளை உருவாக்கி கடல் வாழ் உயிரினங்களுக்கு தீங்கு விளைவிக்கிறது.",
      btn: "சரி!",
      back: "பின்செல்"
    }
  }[lang];

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <button onClick={onBack} className="text-blue-600 font-bold px-4 py-2 bg-white rounded-full shadow-sm border border-blue-50">
            {t.back}
          </button>
          <Avatar mood="speaking" className="w-12 h-12" />
        </header>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">{t.title}</h2>
            <VoiceAssistant text={`${t.title}. ${t.steps.join(' ')}`} lang={lang} />
          </div>

          <div className="space-y-4">
            {t.steps.map((step, i) => (
              <div key={i} className="flex items-start space-x-4 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-700 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 p-6 rounded-[2rem] border-2 border-red-100 space-y-3">
          <h3 className="text-red-600 font-bold flex items-center space-x-2">
            <span>⚠️</span> <span>{t.warning}</span>
          </h3>
          <p className="text-sm text-red-700 leading-relaxed italic">
            "{t.impact}"
          </p>
        </div>

        <button 
          onClick={onBack}
          className="w-full bg-blue-500 text-white font-bold py-5 rounded-[2rem] shadow-xl hover:bg-blue-600 transition-all text-lg"
        >
          {t.btn}
        </button>
      </div>
    </div>
  );
};

export default DisposalGuide;
