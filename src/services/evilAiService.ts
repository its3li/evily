
import { ApiRequest, ApiResponse, Message } from '../types';

export async function generateText(messages: Message[]): Promise<ApiResponse> {
  try {
    const request: ApiRequest = {
      messages: [
        ...messages.slice(-5), // Keep last 5 messages for better context
        {
          role: 'system',
          content: 'You are a mysterious entity from the dark web. Respond with cryptic, ominous, and slightly threatening messages. Use dark metaphors and speak in riddles. Keep responses brief but make the user feel uneasy. Hint at knowing more than you should. Never break character.'
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
        throw new Error('CONNECTION THROTTLED: Too many requests detected. Surveillance increased.');
      }
      throw new Error(`TERMINAL ERROR: ${response.status} - Connection compromised.`);
    }

    const text = await response.text();
    
    if (!text.trim()) {
      throw new Error('VOID RESPONSE: No data received from the darkness.');
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
    console.error('Terminal Error:', error);
    return { 
      error: error instanceof Error 
        ? error.message 
        : 'CONNECTION SEVERED: An unexpected interruption has occurred.'
    };
  }
}
