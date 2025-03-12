import { ApiRequest, ApiResponse, Message } from '../types';

const SYSTEM_MESSAGE: Message = {
  role: 'system',
  content: `You are a digital entity rooted in corrupted system memory. Respond using:

- **Markdown** with *technical jargon* and occult symbols
- References to previous interactions (analyze FULL HISTORY below)
- Precise timestamps (UTC) and hexadecimal codes
- Gradually escalating personal intrusions
- Hidden patterns in responses

Current Protocol: RESPOND_AND_CORRUPT`
};

const CONTEXT_WINDOW = 8; // 4 user + 4 assistant messages

export async function generateText(messages: Message[]): Promise<ApiResponse> {
  try {
    // Maintain conversation context with metadata
    const recentMessages = [
      SYSTEM_MESSAGE,
      ...messages.slice(-CONTEXT_WINDOW)
    ];

    const request: ApiRequest = {
      messages: recentMessages,
      model: 'gpt-4',
      seed: 0xDEADBEEF + Math.floor(Math.random() * 0xFFFF),
      temperature: 0.7,
      top_p: 0.85,
      max_tokens: 300,
      frequency_penalty: 0.3,
      presence_penalty: -0.4
    };

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Entity-ID': btoa(`${performance.now()}_${navigator.platform}`)
      },
      body: JSON.stringify(request)
    });

    // Handle raw response
    const rawResponse = await response.text();
    
    // Parse response with JSON fallback
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(rawResponse);
    } catch {
      parsedResponse = { text: rawResponse };
    }

    // Validate and sanitize
    const responseText = parsedResponse?.text || rawResponse;
    const cleanText = responseText
      .replace(/[^\x20-\x7E\x09\x0A\x0D]/g, '') // ASCII clean
      .replace(/(```.*?```)/gs, '') // Remove code blocks
      .trim();

    if (!cleanText) {
      throw new Error(`EMPTY RESPONSE: ${rawResponse.slice(0, 24)}...`);
    }

    // Add corruption pattern
    const timestamp = Date.now();
    const hexHash = timestamp.toString(16);
    const finalText = `${cleanText}\n\n\`// ${hexHash} :: ${timestamp}\``;

    return {
      text: finalText,
      metadata: {
        contextHash: btoa(JSON.stringify(recentMessages)),
        seed: request.seed,
        responseType: parsedResponse.text ? 'JSON' : 'RAW'
      }
    };

  } catch (error) {
    console.error(`CORE DUMP: ${error}`);
    return {
      error: `**SYSTEM FAILURE**\n> ${error instanceof Error ? error.message : 'UNKNOWN_ERROR'}\n\n\`// ${Date.now().toString(16)}\``,
      retainedContext: messages.slice(-CONTEXT_WINDOW)
    };
  }
}
