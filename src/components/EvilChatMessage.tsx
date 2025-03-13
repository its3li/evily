
import React from 'react';
import { Message } from '../types';
import { cn } from '@/lib/utils';
import { User, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const EvilChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className="mb-5 max-w-5xl mx-auto">
      <div className={cn(
        "flex items-start gap-3",
        isUser ? "text-gray-300" : "text-red-500"
      )}>
        <div className="mt-1">
          {isUser ? (
            <div className="relative">
              <User className="h-4 w-4 text-gray-500" />
            </div>
          ) : (
            <div className="relative">
              <Eye className="h-4 w-4 text-red-600" />
              <div className="absolute inset-0 animate-pulse opacity-50">
                <Eye className="h-4 w-4 text-red-400 blur-[1px]" />
              </div>
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className={cn(
            "px-4 py-3 rounded-sm relative message-content transition-opacity duration-300",
            isUser 
              ? "bg-gray-900/70 shadow-md" 
              : "bg-black/70 border-l-2 border-red-900/50 shadow-md"
          )}>
            {isUser ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <div className="relative">
                <ReactMarkdown 
                  className="prose prose-invert prose-sm max-w-none relative z-10"
                  components={{
                    a: ({node, ...props}) => <a {...props} className="text-red-500 underline hover:text-red-400" target="_blank" rel="noopener noreferrer" />,
                    p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                    ul: ({node, ...props}) => <ul {...props} className="list-disc pl-4 mb-2" />,
                    ol: ({node, ...props}) => <ol {...props} className="list-decimal pl-4 mb-2" />,
                    code: ({node, ...props}) => <code {...props} className="bg-black/50 px-1 py-0.5 rounded font-mono text-red-400" />,
                    pre: ({node, ...props}) => <pre {...props} className="bg-black/50 p-2 rounded font-mono text-red-400 overflow-x-auto mb-2" />
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                
                {/* Subtle visual effect for bot messages */}
                <div className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden opacity-5">
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KICAgIDxmZURpc3BsYWNlbWVudE1hcCBzY2FsZT0iMTUiIGluPSJub2lzZSI+PC9mZURpc3BsYWNlbWVudE1hcD4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ij48L3JlY3Q+Cjwvc3ZnPg==')]"></div>
                </div>
              </div>
            )}
          </div>
          
          {message.timestamp && (
            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] text-gray-600 inline-block">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
