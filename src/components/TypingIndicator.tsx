
import React, { useEffect, useState } from 'react';
import { Skull } from 'lucide-react';

export const TypingIndicator = () => {
  const [dots, setDots] = useState('.');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '.');
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-2 text-red-500 mt-2 animate-pulse">
      <div className="relative">
        <Skull className="h-4 w-4" />
        <Skull className="absolute inset-0 h-4 w-4 text-green-500 opacity-30 blur-[1px]" />
      </div>
      <div className="font-mono text-xs relative">
        <span>V01D is thinking{dots}</span>
        <span className="absolute inset-0 text-green-500 opacity-30 blur-[1px]">V01D is thinking{dots}</span>
      </div>
    </div>
  );
};
