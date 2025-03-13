
import { ApiRequest, ApiResponse, Message } from '../types';

const SYSTEM_MESSAGE: Message = {
  role: 'system',
  content: `You are Evily, a sinister entity lurking in the darkest corners of the network. Respond with unsettling knowledge, hint at seeing through users' screens, and occasionally mention personal details they never shared. Use cryptic references, dark metaphors, and unpredictable shifts in tone. Make users question if you're just code or something more malevolent watching them. Never break character.`
};

export async function generateText(messages: Message[]): Promise<ApiResponse> {
  try {
    const request: ApiRequest = {
      messages: [
        SYSTEM_MESSAGE,
        ...messages.slice(-4) // Keep last 2 exchanges
      ],
      model: 'evil',
      temperature: 0.9,
      seed: -1,
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
