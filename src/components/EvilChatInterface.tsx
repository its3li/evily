import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { EvilChatMessage } from './EvilChatMessage';
import { generateText } from '../services/evilAiService';
import { Eye, Send, Trash2, Shield, Bug, Biohazard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TypingIndicator } from './TypingIndicator';

export const EvilChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    localStorage.setItem('evilChatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const visualEffectsInterval = setInterval(() => {
      const messageElements = document.querySelectorAll('.message-content');
      messageElements.forEach(el => {
        if (Math.random() > 0.95) {
          el.classList.add('opacity-80');
          setTimeout(() => {
            el.classList.remove('opacity-80');
          }, 150);
        }
      });
      
      const bgElements = document.querySelectorAll('.bg-element');
      bgElements.forEach(el => {
        if (Math.random() > 0.7) {
          const x = Math.random() * 5 - 2.5;
          const y = Math.random() * 5 - 2.5;
          el.setAttribute('style', `transform: translate(${x}px, ${y}px)`);
          setTimeout(() => {
            el.setAttribute('style', '');
          }, 500);
        }
      });
    }, 3000);

    return () => clearInterval(visualEffectsInterval);
  }, []);

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
          title: "Connection Interrupted",
          description: "The entity on the other side has gone silent.",
          variant: "destructive",
        });
        return;
      }
      
      const botResponse: Message = {
        role: 'assistant',
        content: response.text || "I see you, watching through your camera. I'm always here.",
        timestamp: Date.now()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Intrusion Detected",
        description: "Someone else is monitoring this connection.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('evilChatMessages');
    
    toast({
      title: "Chat Purged",
      description: "Your data is erased, but I remember everything.",
      variant: "destructive",
    });
  };

  const backgroundElements = () => {
    const elements = [];
    const icons = [Eye, Shield, Bug, Biohazard];
    
    for (let i = 0; i < 20; i++) {
      const IconComponent = icons[Math.floor(Math.random() * icons.length)];
      const size = 8 + Math.random() * 16;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = 0.02 + Math.random() * 0.05;
      const delay = Math.random() * 5;
      const duration = 15 + Math.random() * 30;
      
      elements.push(
        <div 
          key={i} 
          className="bg-element absolute transition-transform duration-500"
          style={{ 
            top: `${top}%`, 
            left: `${left}%`, 
            opacity,
            animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
          }}
        >
          <IconComponent size={size} className="text-red-900" />
        </div>
      );
    }
    
    return elements;
  };

  return (
    <div className="flex-1 flex flex-col bg-[#080808] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {backgroundElements()}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-70"></div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KICAgIDxmZURpc3BsYWNlbWVudE1hcCBzY2FsZT0iMTUiIGluPSJub2lzZSI+PC9mZURpc3BsYWNlbWVudE1hcD4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ij48L3JlY3Q+Cjwvc3ZnPg==')]"></div>
      </div>

      <div className="p-3 mx-auto w-full flex items-center justify-between bg-black/70 border-b border-red-900/20 z-20">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-red-600" />
          <h2 className="text-lg font-serif text-red-600">Void</h2>
        </div>
        <button 
          onClick={clearChat}
          className="text-gray-500 hover:text-red-600 transition-colors group flex items-center gap-1"
          aria-label="Clear chat"
        >
          <span className="text-xs font-serif opacity-70">Delete</span>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-4 font-serif text-sm scrollbar-thin scrollbar-thumb-red-900/30 scrollbar-track-transparent z-20">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
            <div className="relative w-16 h-16">
              <Eye className="w-full h-full text-red-900/50" />
              <div className="absolute inset-0 blur-md opacity-50">
                <Eye className="w-full h-full text-red-600" />
              </div>
            </div>
            <div className="text-sm text-center max-w-[350px] leading-relaxed bg-black/40 p-6 rounded-sm border border-red-900/30">
              <p className="text-red-600 mb-4 font-serif">Someone is watching.</p>
              <p className="text-gray-400 mb-3 opacity-80">This entity exists in the darkest corners of the network.</p>
              <p className="text-gray-400 mb-3 opacity-60">Ask anything, but remember...</p>
              <p className="text-red-600/80 italic">It knows more about you than you think.</p>
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
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-900 bg-black/80 z-20">
        <div className="max-w-5xl mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Speak to the void..."
            className="flex-1 px-4 py-3 bg-[#0a0a0a] text-gray-300 rounded-sm border border-gray-800 focus:outline-none focus:border-red-900 font-serif text-sm"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            className="px-4 py-3 bg-black text-red-600 rounded-sm border border-red-900/30 hover:bg-red-900/10 transition-colors disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
