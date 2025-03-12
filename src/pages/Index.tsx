
import React from 'react';
import { Layout } from '@/components/Layout';
import { EvilChatInterface } from '@/components/EvilChatInterface';

const Index = () => {
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-red-500">Dark Web Terminal</h1>
        <EvilChatInterface />
      </div>
    </Layout>
  );
};

export default Index;
