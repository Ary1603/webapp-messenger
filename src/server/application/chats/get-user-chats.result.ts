import { GetUserChatsSuccessOutput } from "./get-user-chats-success.output";
import { GetUserChatsErrorCode } from "./get-user-chats.error-code";

export type GetUserChatsResult =
    | {
        type: "SUCCESS";
        data: GetUserChatsSuccessOutput;
    }
    | {
        type: "ERROR";
        errorCode: GetUserChatsErrorCode;
    }