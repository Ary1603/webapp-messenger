// Domain
export interface Chat {
    id: string
    type: 'group' | 'private'
    title: string
    lastMessage: string
    createdBy: string
    photoUrl?: string
    createdAt: Date
}