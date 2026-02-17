export type SupabaseLoginAuthSuccessModel = {
  user: {
    id: string;
    email?: string;
    email_verified: boolean;
  };
  session: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
  };
  test: null;
};