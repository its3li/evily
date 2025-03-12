
export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  role: Role;
  content: string;
  timestamp?: number;
}

export interface ApiRequest {
  messages: Message[];
  model: string;
  seed: number;
  temperature?: number;
}

export interface ApiResponse {
  text?: string;
  error?: string;
}
