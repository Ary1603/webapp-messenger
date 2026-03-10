interface User {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
}

interface Chat {
  id: string;
  name: string;
  image: string;
}
export interface SearchUsersNChatsResponse {
  users: Array<User>;
  chats: Array<Chat>;
}
