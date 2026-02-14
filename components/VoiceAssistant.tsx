
import React, { useEffect, useState, useRef } from 'react';
import { Language } from '../types';

interface VoiceAssistantProps {
  text: string;
  lang: Language;
  autoPlay?: boolean;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ text, lang, autoPlay = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (autoPlay && text) {
      handleSpeak();
    }
    return () => synth.cancel();
  }, [text, lang]);

  const handleSpeak = () => {
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-US';
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utteranceRef.current = utterance;
    synth.speak(utterance);
  };

  const togglePlay = () => {
    if (isPlaying) {
      synth.pause();
      setIsPlaying(false);
    } else {
      if (synth.paused) {
        synth.resume();
        setIsPlaying(true);
      } else {
        handleSpeak();
      }
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full border border-green-200">
      <button 
        onClick={togglePlay}
        className="text-green-600 hover:text-green-700 transition-colors p-1"
      >
        {isPlaying ? (
          <span className="text-xl">⏸️</span>
        ) : (
          <span className="text-xl">▶️</span>
        )}
      </button>
      <button 
        onClick={handleSpeak}
        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
      >
        <span className="text-lg">🔄</span>
      </button>
    </div>
  );
};

export default VoiceAssistant;
