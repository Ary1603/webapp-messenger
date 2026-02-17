import { SearchConversationsSuccessOutput } from "./search-conversations.success-output";
import { SearchConversationsErrorCode } from "./search-conversations.error-code";

export type SearchReasult = 
    | {
        type: "SUCCESS";
        data: SearchConversationsSuccessOutput;
    }
    | {
        type: "ERROR";
        errorCode: SearchConversationsErrorCode;
    }