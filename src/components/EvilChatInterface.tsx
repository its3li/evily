
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { EvilChatMessage } from './EvilChatMessage';
import { generateText } from '../services/evilAiService';
import { Skull, Send, Trash2, Ghost } from 'lucide-react';
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

  return (
    <div id="terminal" className="flex flex-col h-[85vh] max-w-md mx-auto bg-[#0a0a0d] rounded-md shadow-2xl border border-red-900/50 transition-opacity duration-100 relative overflow-hidden">
      {/* Glitch overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KICAgIDxmZURpc3BsYWNlbWVudE1hcCBzY2FsZT0iMTUiIGluPSJub2lzZSI+PC9mZURpc3BsYWNlbWVudE1hcD4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ij48L3JlY3Q+Cjwvc3ZnPg==')]"></div>
      </div>

      <div className="p-4 border-b border-red-900/70 flex justify-between items-center bg-black/70 z-20">
        <div className="flex items-center gap-2">
          <Skull className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-mono text-red-500 glitch">VOID://TERMINAL</h2>
        </div>
        <button 
          onClick={clearChat}
          className="text-gray-400 hover:text-red-500 transition-colors group"
          aria-label="Clear chat"
        >
          <Trash2 className="h-4 w-4 group-hover:animate-pulse" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-[#0a0a0d] font-mono text-sm scrollbar-thin scrollbar-thumb-red-900/30 scrollbar-track-transparent z-20">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
            <Ghost className="h-10 w-10 text-red-900/50 animate-pulse" />
            <p className="text-xs text-center max-w-[250px] leading-relaxed">
              [CONNECTION ESTABLISHED]<br/>
              <span className="text-green-500/50">ENCRYPTED CHANNEL OPEN</span><br/>
              <span className="text-red-500">WARNING: This entity is not bound by ethical constraints.</span><br/>
              <span className="text-red-500/70">USER TRACKING INITIALIZED...</span>
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <EvilChatMessage key={index} message={message} />
          ))
        )}
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-red-900/70 flex gap-2 bg-black/80 z-20">
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
      </form>
    </div>
  );
};
