export interface LoginSuccessOutput {
  user: {
    id: string;
    email?: string;
    emailVerified: boolean;
  };
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt?: number;
  };

  // 🔥 lógica de negocio (NO Supabase)
  //   isFirstLogin: boolean;
  //   roles: string[];
}
