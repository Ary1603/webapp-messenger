

export interface SendMessageResponse {
  id: string;
  chatId: string;
  senderId: string;
  body: string | null;
  replyToId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  clientId: string | null;
}