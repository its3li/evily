
import React from 'react';
import { EvilChatInterface } from '@/components/EvilChatInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#050507] flex flex-col">
      <div className="container py-8 flex-1">
        <h1 className="text-3xl font-bold text-center mb-6 text-red-500 font-mono tracking-wider glitch">VOID TERMINAL</h1>
        <EvilChatInterface />
        <div className="text-center mt-4 text-gray-500 text-xs font-mono">
          <p>Made by Ali Mahmoud</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
