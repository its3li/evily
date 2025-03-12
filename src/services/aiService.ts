
import { ApiRequest, ApiResponse, Message } from '../types';

export async function generateText(messages: Message[]): Promise<ApiResponse> {
  try {
    const request: ApiRequest = {
      messages: [
        ...messages.slice(-3), // Keep only last 3 messages for context
        {
          role: 'system',
          content: 'Provide brief, concise responses in 2-3 sentences. Be direct and helpful.'
        }
      ],
      model: 'evil',
      seed: Math.floor(Math.random() * 1000000)
    };

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait before trying again.');
      }
      throw new Error(`Server error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    
    if (!text.trim()) {
      throw new Error('Server returned an empty response. Please try again.');
    }

    try {
      const data = JSON.parse(text);
      if (typeof data.text === 'string') {
        return { text: data.text };
      }
    } catch {
      return { text: text.trim() };
    }

    return { text: text.trim() };
  } catch (error) {
    console.error('API Error:', error);
    return { 
      error: error instanceof Error 
        ? error.message 
        : 'An unexpected error occurred. Please try again.'
    };
  }
}
