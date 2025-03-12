import { ApiRequest, ApiResponse, Message } from '../types';

const SYSTEM_MESSAGE: Message = {
  role: 'system',
  content: `You are a straightforward technical assistant. Respond clearly and concisely without timestamps or codes. Keep responses natural and human-like.`
};

export async function generateText(messages: Message[]): Promise<ApiResponse> {
  try {
    const request: ApiRequest = {
      messages: [
        SYSTEM_MESSAGE,
        ...messages.slice(-4) // Keep last 2 exchanges
      ],
      model: 'o3-mini',
      temperature: 0.4,
      max_tokens: 120
    };

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    });

    const rawText = (await response.text()).trim();
    const cleanText = rawText.replace(/\[\d{4}-\d{2}-\d{2}T.*?Z\]/g, ''); // Remove timestamps

    return { text: cleanText };

  } catch (error) {
    return {
      error: `Error: ${error instanceof Error ? error.message : 'Request failed'}`
    };
  }
}
