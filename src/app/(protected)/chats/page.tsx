"use client";
import { useEffect, useMemo, useState } from "react";
import { ChatsContent } from "@/components/chats/ChatsContent";
import ChatsHeader from "@/components/Headers/ChatsHeader";
import { useChatsStore } from "@/stores/chats/chatsStore";
import { errorHandler, type ApiError } from "@/utils/error/errorHandler";
import SearchInput from "@/components/inputs/SearchInput";
import { useI18n } from "@/components/language/LanguageProvider";
import ConversationSearchContent from "@/components/chats/ConversationSearchContent";
//import type { SearchChatItem } from "@/types/components/search-chats-content";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import ChatsSkeletonPage from "@/components/skeletons/page/ChatsSkeletonPage";
import { SearchUsersNChatsResponse } from "@/contracts/search/conversations/search-conversations.response";
import { SearchedUserVM } from "@/types/view-models/user.vm";

function ChatsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchedUsersNChats, setSearchedUsersNChats] =
    useState<SearchUsersNChatsResponse>({
      users: [],
      chats: [],
    });
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 400);
  const [isSearching, setIsSearching] = useState(false);
  const initialChats = useChatsStore((state) => state.getUserChats);
  const chats = useChatsStore((state) => state.chats);
  const searchUsersNChats = useChatsStore((state) => state.searchUsersNChats);
  const getOrCreateDirectChatBetweenUsers = useChatsStore((state) => state.getOrCreateDirectChatBetweenUsers);
  const { messages } = useI18n();
  const router = useRouter();
  //const ref = useRef<HTMLButtonElement>(null);

  const handlers = useMemo(
    () => ({
      // "AUTH-1077": async () => {
      //   console.log()
      // },
    }),
    [],
  );

  useEffect(() => {
    const fetchInitialChat = async () => {
      try {
        setIsLoading(true);
        await initialChats();
      } catch (error) {
        errorHandler(error as ApiError, handlers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialChat();
  }, [initialChats, handlers]);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      return;
    }

    const fetchSearch = async () => {
      try {
        const response = await searchUsersNChats({
          query: debouncedQuery,
        });
        setSearchedUsersNChats(response.payload.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSearch();
  }, [debouncedQuery, searchUsersNChats]);

  const handleNewChat = () => {
    alert("Crear nuevo chatxx");
  };

  const handleSearchedSelectedChat = async (selectedItem: SearchedUserVM ) => {
    const response = await getOrCreateDirectChatBetweenUsers({
      userB_id: selectedItem.id
    })
    console.log("[handleSearchedSelectedChat] response: ", response);
    //router.push(`/chats/123`);
    //console.log("Seleccione un chat");
  };

  const handleOpenChat = (chat: any) => {
    console.log("Se va abrir el chat: ", chat);
    router.push(`/chats/${chat.chat_id}`);
  };

  if (!messages) return null;

  return (
    <div>
      {isLoading ? (
        <ChatsSkeletonPage />
      ) : (
        <div className="flex h-screen flex-col">
          {/* Header */}
          <ChatsHeader
            title={messages.chat_header}
            onOpenConfig={() => console.log("Configuración")}
            onCreateNewChat={() => console.log("Nuevo chat")}
            // rightExtras={<YourProfileAvatar />}
          />

          {/* Search input */}
          <SearchInput
            className="mt-3 px-3"
            value={query}
            onChange={setQuery}
            onFocus={() => setIsSearching(true)}
            onBlur={() => {
              setTimeout(() => {
                setIsSearching(false);
              }, 150);
            }}
            placeholder={messages.search_input_chats}
          />
          <div className="flex-1 overflow-hidden">
            {isSearching ? (
              <ConversationSearchContent
                className="pt-4"
                searchedData={searchedUsersNChats}
                onChatClick={handleSearchedSelectedChat}
                // onChatClick={setSelectedChat}
                emptyDescription={messages.try_different_search}
              />
            ) : (
              <ChatsContent
                className="mt-5"
                chats={chats}
                onNewChat={handleNewChat}
                onOpenChat={handleOpenChat}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatsPage;
