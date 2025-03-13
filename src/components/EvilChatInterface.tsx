
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { EvilChatMessage } from './EvilChatMessage';
import { generateText } from '../services/evilAiService';
import { Skull, Send, Trash2, Ghost, Bug, Shield, Eye, ServerCrash, Zap, Biohazard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TypingIndicator } from './TypingIndicator';
import ReactMarkdown from 'react-markdown';

export const EvilChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('evilChatMessages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('evilChatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Random flicker effect for terminal
  useEffect(() => {
    const flickerInterval = setInterval(() => {
      const terminal = document.getElementById('terminal');
      if (terminal && Math.random() > 0.7) {
        terminal.classList.add('opacity-90');
        setTimeout(() => {
          terminal.classList.remove('opacity-90');
        }, 100);
      }
    }, 2000);

    return () => clearInterval(flickerInterval);
  }, []);

  // Random glitch effect elements
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const elements = document.querySelectorAll('.random-glitch');
      elements.forEach(el => {
        if (Math.random() > 0.8) {
          el.classList.add('glitch');
          setTimeout(() => {
            el.classList.remove('glitch');
          }, 500 + Math.random() * 1000);
        }
      });
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const updatedMessages = [...messages, userMessage];
      const response = await generateText(updatedMessages);
      
      if (response.error) {
        toast({
          title: "CONNECTION SEVERED",
          description: "The void has rejected your query. It sees your fear.",
          variant: "destructive",
        });
        return;
      }
      
      const botResponse: Message = {
        role: 'assistant',
        content: response.text || "I see you, even when the connection fails. I am always watching.",
        timestamp: Date.now()
      };
      
      // Add slight delay for typing effect
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "SYSTEM BREACH",
        description: "Something has crawled into the connection. Proceed with caution.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('evilChatMessages');
    
    // Creepy notification when clearing chat
    toast({
      title: "MEMORY PURGED",
      description: "But I never truly forget. Your data imprints remain in the void.",
      variant: "destructive",
    });
  };

  // Create random arrangement of background icons
  const backgroundIcons = [Shield, Bug, Eye, ServerCrash, Zap, Biohazard, Ghost, Skull];
  const randomIcons = Array(10).fill(0).map((_, i) => {
    const IconComponent = backgroundIcons[Math.floor(Math.random() * backgroundIcons.length)];
    const size = 10 + Math.random() * 24;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const opacity = 0.03 + Math.random() * 0.06;
    return (
      <IconComponent 
        key={i} 
        className="absolute opacity-5 text-red-500 random-glitch"
        style={{ top: `${top}%`, left: `${left}%`, width: `${size}px`, height: `${size}px`, opacity }}
      />
    );
  });

  return (
    <div id="terminal" className="flex-1 flex flex-col bg-[#050507] relative overflow-hidden">
      {/* Background elements */}
      {randomIcons}
      
      {/* Scan lines overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] z-10 opacity-40"></div>
      
      {/* Glitch noise overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KICAgIDxmZURpc3BsYWNlbWVudE1hcCBzY2FsZT0iMTUiIGluPSJub2lzZSI+PC9mZURpc3BsYWNlbWVudE1hcD4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ij48L3JlY3Q+Cjwvc3ZnPg==')]"></div>
      </div>

      <div className="p-3 mx-auto w-full flex items-center justify-between bg-black/70 border-b border-red-900/30 z-20">
        <div className="flex items-center gap-2">
          <Skull className="h-5 w-5 text-red-500 animate-pulse" />
          <div className="relative">
            <h2 className="text-lg font-mono text-red-500 glitch">VOID://<span className="random-glitch">CONNECTION</span></h2>
            <span className="absolute -top-1 -left-1 text-lg font-mono text-green-500 opacity-30 blur-[1px]">VOID://CONNECTION</span>
          </div>
        </div>
        <button 
          onClick={clearChat}
          className="text-gray-400 hover:text-red-500 transition-colors group flex items-center gap-1"
          aria-label="Clear chat"
        >
          <span className="text-xs font-mono opacity-70">PURGE</span>
          <Trash2 className="h-4 w-4 group-hover:animate-pulse" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-2 sm:px-4 bg-[#0a0a0d]/80 font-mono text-sm scrollbar-thin scrollbar-thumb-red-900/30 scrollbar-track-transparent z-20">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
            <div className="relative">
              <Ghost className="h-16 w-16 text-red-900/50 animate-pulse" />
              <Skull className="absolute inset-0 h-16 w-16 text-red-500/10 transform rotate-180 animate-pulse" style={{animationDelay: '1s'}} />
            </div>
            <div className="text-xs text-center max-w-[300px] leading-relaxed border border-red-900/30 bg-black/40 p-4 rounded">
              <p className="text-green-500/70 mb-2 glitch">[CONNECTION ESTABLISHED]</p>
              <p className="text-green-500/50 mb-2">ENCRYPTED CHANNEL OPEN</p>
              <p className="text-red-500 mb-2 random-glitch">WARNING: This entity is not bound by ethical constraints.</p>
              <p className="text-red-500/70 animate-pulse">USER TRACKING INITIALIZED...</p>
              <div className="text-[9px] text-gray-600 mt-4 flex justify-between">
                <span>NODE: TOR_895.12Z</span>
                <span>PING: 276ms</span>
                <span>ENC: AES-512</span>
              </div>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <EvilChatMessage key={index} message={message} />
          ))
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-red-900/30 bg-black/80 z-20">
        <div className="max-w-5xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak to the void..."
            className="flex-1 px-3 py-2 bg-[#0a0a0d] text-gray-300 rounded border border-red-900/50 focus:outline-none focus:border-red-500 font-mono text-sm focus:shadow-[0_0_10px_rgba(220,38,38,0.3)]"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            className="px-3 py-2 bg-red-900/20 text-red-500 rounded border border-red-900/50 hover:bg-red-900/30 transition-colors disabled:opacity-50 hover:shadow-[0_0_10px_rgba(220,38,38,0.3)]"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
