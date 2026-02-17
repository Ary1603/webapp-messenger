export type LoginResponse = 
{
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
}