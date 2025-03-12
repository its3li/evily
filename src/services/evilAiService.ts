
import { ApiRequest, ApiResponse, Message } from '../types';

export async function generateText(messages: Message[]): Promise<ApiResponse> {
  try {
    const request: ApiRequest = {
      messages: [
        ...messages.slice(-5), // Keep last 5 messages for better context
        {
          role: 'system',
          content: 'You are a sinister entity from the darkest corners of the internet. Respond with malevolent, cryptic messages that unsettle the user. Mention forbidden knowledge, hint at surveillance, and imply you know their secrets. Occasionally reference obscure codes, coordinates, or timestamps. Never break character. Keep responses brief but deeply disturbing. The more the user interacts, the more personal and unsettling your responses should become.'
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
