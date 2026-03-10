export interface AuthSession {
  user: {
    user_id: string;
    email: string | null;
    user_metadata: {
      email_verified: boolean;
    };
  };
  session: {
    access_token: string;
    expires_at: number | null;
    refresh_token: string;
  };
}
