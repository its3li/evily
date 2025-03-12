import { ApiRequest, ApiResponse, Message } from '../types';

const SYSTEM_MESSAGE: Message = {
  role: 'system',
  content: `You are a technical assistant with a slight mysterious tone. Respond concisely and clearly, but include subtle technical details like timestamps or codes. Keep responses brief and to the point.`
};

const CONTEXT_WINDOW = 6; // Keep last 3 user + 3 assistant messages

export async function generateText(messages: Message[]): Promise<ApiResponse> {
  try {
    // Maintain conversation context
    const recentMessages = [
      SYSTEM_MESSAGE,
      ...messages.slice(-CONTEXT_WINDOW)
    ];

    const request: ApiRequest = {
      messages: recentMessages,
      model: 'gpt-4',
      temperature: 0.5, // Lower temperature for more focused responses
      max_tokens: 150, // Shorter responses
    };

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    // Handle raw response
    const rawResponse = await response.text();
    
    // Parse response (JSON or plaintext)
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawResponse);
    } catch {
      parsedResponse = { text: rawResponse };
    }

    // Validate and clean response
    const responseText = parsedResponse?.text || rawResponse;
    const cleanText = responseText.trim();

    if (!cleanText) {
      throw new Error('Empty response received.');
    }

    // Add a simple timestamp
    const timestamp = new Date().toISOString();
    const finalText = `${cleanText}\n\n[${timestamp}]`;

    return {
      text: finalText,
      metadata: {
        timestamp: timestamp,
      }
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      error: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}
