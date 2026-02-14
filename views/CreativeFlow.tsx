
import React, { useState } from 'react';
import { generateReuseInstructions } from '../services/gemini';
import { ReuseInstruction, Language, Tool } from '../types';
import VoiceAssistant from '../components/VoiceAssistant';
import Avatar from '../components/Avatar';

interface CreativeFlowProps {
  materialName: string;
  onBack: () => void;
  lang: Language;
}

const TOOLS: Tool[] = ['Scissors', 'Glue', 'Cutter', 'Paint', 'Thread'];

const CreativeFlow: React.FC<CreativeFlowProps> = ({ materialName, onBack, lang }) => {
  const [selectedTools, setSelectedTools] = useState<Tool[]>([]);
  const [instructions, setInstructions] = useState<ReuseInstruction | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const t = {
    en: {
      tools: "What tools do you have?",
      btn: "Get Blueprint",
      step: "Step",
      completed: "Project Done!",
      videos: "YouTube DIY Videos",
      back: "Back"
    },
    ta: {
      tools: "உங்களிடம் என்ன கருவிகள் உள்ளன?",
      btn: "திட்டத்தைப் பெறுங்கள்",
      step: "படி",
      completed: "திட்டம் முடிந்தது!",
      videos: "யூடியூப் வீடியோக்கள்",
      back: "பின்செல்"
    }
  }[lang];

  const handleToggleTool = (tool: Tool) => {
    setSelectedTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]);
  };

  const handleGenerate = async () => {
    if (selectedTools.length === 0) {
      alert(lang === 'en' ? "Select at least one tool!" : "குறைந்தது ஒரு கருவியைத் தேர்ந்தெடுக்கவும்!");
      return;
    }
    setLoading(true);
    try {
      const res = await generateReuseInstructions(materialName, "Upcycled Craft", selectedTools, lang);
      setInstructions(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-white">
      <Avatar mood="thinking" className="w-16 h-16" />
      <p className="text-xl font-bold font-heading text-purple-600">
        {lang === 'en' ? 'Crafting Blueprint...' : 'திட்டத்தைத் தயாரிக்கிறது...'}
      </p>
    </div>
  );

  if (instructions) {
    const currentStep = instructions.steps[activeStep];
    return (
      <div className="min-h-screen bg-purple-50 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <header className="flex items-center justify-between">
            <button onClick={() => setInstructions(null)} className="text-purple-600 font-bold px-4 py-2 bg-white rounded-full shadow-sm border border-purple-50">
              {t.back}
            </button>
            <Avatar mood="speaking" className="w-12 h-12" />
          </header>

          <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border-4 border-white overflow-hidden">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">{instructions.projectName}</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {t.step} {currentStep.step}
                </span>
                <VoiceAssistant text={currentStep.instruction} lang={lang} />
              </div>
              
              <div className="aspect-video rounded-3xl overflow-hidden bg-gray-100 border-2 border-purple-50">
                <img 
                  src={`https://picsum.photos/seed/${currentStep.visualPrompt.length}/600/400`} 
                  className="w-full h-full object-cover opacity-90" 
                  alt="instruction" 
                />
              </div>
              
              <p className="text-gray-700 font-medium leading-relaxed min-h-[4rem]">
                {currentStep.instruction}
              </p>

              <div className="flex space-x-4 pt-4">
                <button 
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => prev - 1)}
                  className="flex-1 py-4 bg-gray-100 rounded-2xl font-bold text-gray-500 disabled:opacity-30"
                >
                  Prev
                </button>
                {activeStep < instructions.steps.length - 1 ? (
                  <button 
                    onClick={() => setActiveStep(prev => prev + 1)}
                    className="flex-[2] py-4 bg-purple-500 text-white rounded-2xl font-bold shadow-lg"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={onBack}
                    className="flex-[2] py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg"
                  >
                    {t.completed}
                  </button>
                )}
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="font-bold text-gray-800 text-lg flex items-center space-x-2">
              <span className="text-red-600">📺</span> <span>{t.videos}</span>
            </h3>
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {[1, 2].map(i => (
                <a 
                  key={i}
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(instructions.youtubeSearchQuery)}`}
                  target="_blank"
                  className="shrink-0 w-48 bg-white rounded-2xl p-2 shadow-sm border border-gray-100"
                >
                  <div className="relative h-24 bg-gray-200 rounded-xl overflow-hidden mb-2">
                    <img src={`https://picsum.photos/seed/yt${i}/300/200`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">▶️</div>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-gray-700 line-clamp-2">Creative {materialName} DIY Guide #{i}</p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-md mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="text-green-600 font-bold px-4 py-2 bg-white rounded-full shadow-sm border border-green-50">
            {t.back}
          </button>
          <Avatar mood="happy" className="w-12 h-12" />
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{t.tools}</h2>
          <div className="grid grid-cols-2 gap-3">
            {TOOLS.map(tool => (
              <button
                key={tool}
                onClick={() => handleToggleTool(tool)}
                className={`p-4 rounded-2xl border-2 font-bold transition-all text-sm flex items-center space-x-2 ${
                  selectedTools.includes(tool) 
                  ? 'bg-purple-100 border-purple-400 text-purple-700' 
                  : 'bg-gray-50 border-gray-100 text-gray-400'
                }`}
              >
                <span>{selectedTools.includes(tool) ? '✅' : '⚪'}</span>
                <span>{tool}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          className="w-full bg-purple-500 text-white font-bold py-5 rounded-[2rem] shadow-xl hover:bg-purple-600 transition-all text-lg"
        >
          {t.btn} 🚀
        </button>
      </div>
    </div>
  );
};

export default CreativeFlow;
