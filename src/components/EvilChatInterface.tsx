
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { EvilChatMessage } from './EvilChatMessage';
import { generateText } from '../services/evilAiService';
import { Skull, Send, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const EvilChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
          title: "System Failure",
          description: response.error,
          variant: "destructive",
        });
        return;
      }
      
      const botResponse: Message = {
        role: 'assistant',
        content: response.text || "Connection lost. Terminal corrupted.",
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      toast({
        title: "Fatal Error",
        description: "Connection to dark network severed.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('evilChatMessages');
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-md mx-auto bg-[#1A1F2C] rounded-md shadow-lg border border-red-900">
      <div className="p-4 border-b border-red-900 flex justify-between items-center bg-black/30">
        <div className="flex items-center gap-2">
          <Skull className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-mono text-red-500">VOID://TERMINAL</h2>
        </div>
        <button 
          onClick={clearChat}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Clear chat"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-[#221F26]/80 font-mono text-sm">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-xs text-center max-w-[250px]">
              [CONNECTION ESTABLISHED]<br/>
              All communications are encrypted and will be erased after termination.
              <br/>
              <span className="text-red-500">PROCEED WITH CAUTION</span>
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <EvilChatMessage key={index} message={message} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t border-red-900 flex gap-2 bg-black/50">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          className="flex-1 px-3 py-2 bg-[#1A1F2C] text-gray-300 rounded border border-red-900/50 focus:outline-none focus:border-red-500 font-mono text-sm"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()} 
          className="px-3 py-2 bg-red-900/30 text-red-500 rounded border border-red-900/50 hover:bg-red-900/50 transition-colors disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
