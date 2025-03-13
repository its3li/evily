
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
    <div className="flex items-center gap-2 text-red-500 opacity-75 animate-pulse mt-2">
      <Skull className="h-4 w-4" />
      <span className="font-mono text-xs">V01D is thinking{dots}</span>
    </div>
  );
};
