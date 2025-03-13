
import { ApiRequest, ApiResponse, Message } from '../types';

// This is a placeholder file to satisfy imports in the read-only ChatInterface.tsx
// The actual chat functionality uses evilAiService.ts
export async function generateText(messages: Message[]): Promise<ApiResponse> {
  return {
    text: "This service is not in use. Using evilAiService instead."
  };
}
