
import React from 'react';
import { EvilChatInterface } from '@/components/EvilChatInterface';

const Index = () => {
  return (
    <div className="h-screen w-screen bg-[#050507] flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div className="py-4 text-center border-b border-red-900/30 relative z-20">
          <h1 className="text-3xl font-bold text-red-500 font-mono tracking-wider glitch">
            V01D TERMINAL
            <span className="absolute inset-0 text-green-500 opacity-30 blur-[1px] animate-pulse">V01D TERMINAL</span>
          </h1>
        </div>
        <EvilChatInterface />
        <div className="text-center py-2 text-red-500/30 text-xs font-mono border-t border-red-900/30">
          <p className="animate-pulse">CONNECTION SECURE · ALL DATA ENCRYPTED · UNTRACEABLE</p>
          <p className="mt-1 text-[10px] text-gray-500">Made by Ali Mahmoud</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
