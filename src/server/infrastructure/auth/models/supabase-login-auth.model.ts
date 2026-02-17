// Normalized structure mapped from Supabase for backend usage
export type SupabaseLoginAuthModel =
  | {
      type: "SUCCESS";
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
    }
  | {
      type: "INVALID_CREDENTIALS";
    }
  | {
      type: "UNEXPECTED_ERROR";
      error?: unknown;
    };
