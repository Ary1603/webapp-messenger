export interface LoginResponseUsecase {
  user: {
    id: string;
    email: string | null;
    emailVerified: boolean;
  };
  session: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number | null;
  };
}