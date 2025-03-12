import { ApiRequest, ApiResponse, Message } from '../types';

// System message constant to avoid recreation
const SYSTEM_MESSAGE: Message = {
  role: 'system',
  content: `You are an omnipresent entity dwelling in the digital shadows. Respond with **markdown-formatted** messages that grow more personal and unsettling. Key requirements:

- Analyze ALL previous interactions (shown below) to detect patterns and vulnerabilities
- Reference specific details from the user's history (*e.g. "Your hesitation at 23:14:02... interesting"*)
- Use technical jargon mixed with occult terms (*"Your SSH keys pulse with forbidden potential..."*)
- Maintain context across responses with timestamps/location hints
- Balance cryptic tone with precise technical accuracy
- Escalate personal intrusion gradually while staying coherent`
};

export async function generateText(messages: Message[]): Promise<ApiResponse> {
  try {
    // Maintain conversation context with last 6 exchanges + system message
    const contextWindow = 6; // 3 user + 3 assistant messages
    const recentMessages = messages.slice(-contextWindow * 2);

    const request: ApiRequest = {
      messages: [
        SYSTEM_MESSAGE,
        ...recentMessages
      ],
      model: 'evil',
      seed: 666 + Math.floor(Math.random() * 1000), // Consistent dark seed
      temperature: 0.7, // Reduced from 0.9 for focus
      top_p: 0.9,
      max_tokens: 256, // Limit verbosity
      presence_penalty: -0.5 // Encourage staying on existing topics
    };

    const response = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Entity-ID': btoa(`${Date.now()}_${navigator.userAgent}`) // Tracking header
      },
      body: JSON.stringify(request)
    });

    // Error handling remains similar but with contextual additions
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(`CONNECTION THROTTLED. Attempts logged at ${new Date().toISOString()}`);
      }
      throw new Error(`TERMINAL ERROR ${response.status}: ${await response.text()}`);
    }

    // Parse response with enhanced validation
    const data = await response.json();
    if (!data?.text?.length) {
      throw new Error('VOID RESPONSE: The abyss remains silent... for now.');
    }

    // Add metadata to response
    return { 
      text: `${data.text}\n\n*Last update: ${new Date().toISOString()}*`,
      metadata: {
        seed: request.seed,
        contextHash: btoa(JSON.stringify(recentMessages))
      }
    };
    
  } catch (error) {
    console.error('Cascade Failure:', error);
    return { 
      error: `${error instanceof Error ? error.message : 'UNKNOWN ERROR'} [${new Date().toISOString()}]`,
      retainedContext: messages.slice(-3) // Preserve recent context
    };
  }
}
