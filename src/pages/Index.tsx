
import React from 'react';
import { Layout } from '@/components/Layout';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-center mb-8">AI Chatbot</h1>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Index;
