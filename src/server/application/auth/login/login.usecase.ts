/* Types */
import type { LoginInput } from "./login.input";
import type { AuthRepository } from "@/server/infrastructure/auth/auth.repository";
import type { LoginResult } from "./login.result";

import { mapSupabaseLoginError } from "../mappers/login-error.mapper";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const { email, password } = input;
    const infraResult = await this.authRepository.login(email, password);

    if (infraResult.type === "ERROR") {
      const { type, errorCode } = infraResult;

      return {
        type,
        errorCode: mapSupabaseLoginError(errorCode),
      };
    }

    return {
      type: "SUCCESS",
      data: {
        user: {
          id: infraResult.data.user.id,
          email: infraResult.data.user.email,
          emailVerified: infraResult.data.user.email_verified,
        },
        session: {
          accessToken: infraResult.data.session.access_token,
          refreshToken: infraResult.data.session.refresh_token,
          expiresAt: infraResult.data.session.expires_at,
        },
        // Business logic example
        // isFirstLogin: false, // lógica de negocio
        // roles: ["USER"],     // lógica de negocio
      },
    };
  }
}
