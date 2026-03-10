export type SendMessageUseCaseInput = {
  chatId: string
  body?: string
  replyToId?: string
  metadata?: Record<string, unknown>
  clientId?: string
}