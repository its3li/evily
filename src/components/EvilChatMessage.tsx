
import React from 'react';
import { Message } from '../types';
import { cn } from '@/lib/utils';
import { User, Skull } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
}

export const EvilChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className="mb-4 max-w-5xl mx-auto">
      <div className={cn(
        "flex items-start gap-2",
        isUser ? "text-gray-300" : "text-red-400"
      )}>
        <div className="mt-1">
          {isUser ? (
            <div className="relative">
              <User className="h-4 w-4 text-gray-500" />
              <span className="absolute -top-1 -left-1 text-[6px] text-gray-500">USER.345</span>
            </div>
          ) : (
            <div className="relative">
              <Skull className="h-4 w-4 text-red-500" />
              <Skull className="absolute inset-0 h-4 w-4 text-green-500 opacity-30 blur-[1px]" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className={cn(
            "px-3 py-2 rounded relative",
            isUser 
              ? "bg-gray-800/50 border border-gray-700/80 shadow-[0_0_5px_rgba(0,0,0,0.3)]" 
              : "bg-red-900/20 border border-red-900/50 shadow-[0_0_10px_rgba(220,38,38,0.15)]"
          )}>
            {isUser ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <div className="relative">
                <ReactMarkdown 
                  className="prose prose-invert prose-sm max-w-none relative z-10"
                  components={{
                    a: ({node, ...props}) => <a {...props} className="text-red-400 underline hover:text-red-300" target="_blank" rel="noopener noreferrer" />,
                    p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                    ul: ({node, ...props}) => <ul {...props} className="list-disc pl-4 mb-2" />,
                    ol: ({node, ...props}) => <ol {...props} className="list-decimal pl-4 mb-2" />,
                    code: ({node, ...props}) => <code {...props} className="bg-black/30 px-1 py-0.5 rounded font-mono text-red-300" />,
                    pre: ({node, ...props}) => <pre {...props} className="bg-black/30 p-2 rounded font-mono text-red-300 overflow-x-auto mb-2" />
                  }}
                >
                  {message.content}
                </ReactMarkdown>
                {/* Ghost text effect for AI responses */}
                <div className="absolute inset-0 opacity-30 blur-[1px] pointer-events-none">
                  <ReactMarkdown 
                    className="prose prose-sm max-w-none text-green-500/30"
                    components={{
                      p: ({node, ...props}) => <p {...props} className="mb-2 last:mb-0" />,
                      a: ({node, ...props}) => <a {...props} />,
                      ul: ({node, ...props}) => <ul {...props} className="list-disc pl-4 mb-2" />,
                      ol: ({node, ...props}) => <ol {...props} className="list-decimal pl-4 mb-2" />,
                      code: ({node, ...props}) => <code {...props} />,
                      pre: ({node, ...props}) => <pre {...props} />
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            )}
            {!isUser && (
              <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxmaWx0ZXIgaWQ9Im5vaXNlIj4KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIj48L2ZlVHVyYnVsZW5jZT4KICAgIDxmZURpc3BsYWNlbWVudE1hcCBzY2FsZT0iMTUiIGluPSJub2lzZSI+PC9mZURpc3BsYWNlbWVudE1hcD4KICA8L2ZpbHRlcj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1Ij48L3JlY3Q+Cjwvc3ZnPg==')]"></div>
              </div>
            )}
          </div>
          {message.timestamp && (
            <div className="flex justify-between items-center mt-1">
              <span className="text-[10px] opacity-50 inline-block">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              {!isUser && (
                <span className="text-[8px] text-red-500/50 font-mono">ENCRYPTED VIA TOR</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
