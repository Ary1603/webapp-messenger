export interface SupabaseUserChatsSuccessModel {
    chats: Chat[]
}

interface Chat {
    chat_id: number;
    created_at: string;
    chat_type: 'group' | 'dm';
    title: string;
    created_by: string;
    photo_url?: string;
}