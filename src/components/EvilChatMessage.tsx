
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
    <div className="mb-4">
      <div className={cn(
        "flex items-start gap-2",
        isUser ? "text-gray-300" : "text-red-400"
      )}>
        <div className="mt-1">
          {isUser ? (
            <User className="h-4 w-4 text-gray-500" />
          ) : (
            <Skull className="h-4 w-4 text-red-500" />
          )}
        </div>
        <div className="flex-1">
          <div className={cn(
            "px-3 py-2 rounded",
            isUser ? "bg-gray-800/50 border border-gray-700" : "bg-red-900/20 border border-red-900/50"
          )}>
            {isUser ? (
              <p className="whitespace-pre-wrap">{message.content}</p>
            ) : (
              <ReactMarkdown 
                className="prose prose-invert prose-sm max-w-none"
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
            )}
          </div>
          {message.timestamp && (
            <span className="text-[10px] opacity-50 mt-1 inline-block">
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
