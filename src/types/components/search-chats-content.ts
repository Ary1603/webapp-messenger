import { SearchedUserVM } from "../view-models/user.vm";
export interface ConversationSearchContentProps {
    searchedData: {
      users: Array<SearchedUserVM>;
      chats: Array<any>
    }
    onChatClick: (chat: SearchedUserVM) => void;
    emptyDescription?: string;
    className?: string;
}