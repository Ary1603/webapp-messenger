import type { SupabaseUserChatsSuccessModel } from "./supabase-user-chats-success.model";

export type UserChatsInfraResult = 
    | {
        type: "SUCCESS";
        data: SupabaseUserChatsSuccessModel;
    }
    | {
        type: "ERROR";
        errorCode: string;
        error?: unknown;
    }