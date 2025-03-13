
import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export const TypingIndicator = () => {
  const [dots, setDots] = useState('.');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '.');
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-center gap-2 text-red-600 mt-2">
      <div className="relative">
        <Eye className="h-4 w-4" />
        <div className="absolute inset-0 animate-pulse opacity-50">
          <Eye className="h-4 w-4 text-red-400 blur-[1px]" />
        </div>
      </div>
      <div className="font-serif text-xs">
        <span>Void is watching{dots}</span>
      </div>
    </div>
  );
};
