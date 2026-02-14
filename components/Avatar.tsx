
import React from 'react';

interface AvatarProps {
  mood?: 'happy' | 'thinking' | 'speaking';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ mood = 'happy', className = '' }) => {
  const getEmoji = () => {
    switch (mood) {
      case 'thinking': return '🤔';
      case 'speaking': return '🗣️';
      default: return '🍃';
    }
  };

  return (
    <div className={`relative flex items-center justify-center bg-green-100 rounded-full shadow-inner border-2 border-green-200 ${className}`}>
      <span className="text-3xl animate-bounce" style={{ animationDuration: mood === 'speaking' ? '0.5s' : '2s' }}>
        {getEmoji()}
      </span>
      {mood === 'speaking' && (
        <div className="absolute -top-1 -right-1 flex space-x-0.5">
          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-1 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
