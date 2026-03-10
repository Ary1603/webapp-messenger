

export interface SendMessageRequest {
  chatId: string;
  body?: string;
  replyToId?: string | null;
  metadata?: Record<string, unknown> | null;
  clientId?: string;
}