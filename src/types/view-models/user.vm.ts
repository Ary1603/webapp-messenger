export interface UserVM {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  isEmailVerified: boolean;
}

export interface SearchedUserVM {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
}
