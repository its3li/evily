
import React from 'react';
import { EvilChatInterface } from '@/components/EvilChatInterface';

const Index = () => {
  return (
    <div className="h-screen w-screen bg-black flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col">
        <div className="py-4 text-center relative z-20 border-b border-gray-900">
          <h1 className="text-3xl font-bold text-red-600 font-serif tracking-wider">
            EVILY
            <span className="mx-2 text-sm opacity-50">•</span>
            <span className="text-lg opacity-70">DARKNET</span>
            <div className="absolute inset-0 blur-sm opacity-30 text-red-400 pointer-events-none">EVILY DARKNET</div>
          </h1>
          <p className="text-xs text-red-500/50 mt-1 font-mono">CONNECTION UNTRACEABLE • SECURE CHANNEL</p>
        </div>
        <EvilChatInterface />
        <div className="text-center py-2 text-gray-600 text-xs border-t border-gray-900">
          <p className="opacity-50">All communications encrypted via onion routing</p>
          <p className="mt-1 text-[10px] opacity-30">Created by Ali Mahmoud</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
