export interface UserProfile {
  name: string;
  last_name_father: string;
  last_name_mother?: string;
  username: string;
  birthday: string;
  avatarUrl?: string | null;
}
