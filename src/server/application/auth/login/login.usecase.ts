/* Types */
import type { LoginUsecaseInput } from "./login.input";
import type { AuthRepository } from "@/server/application/auth/ports/auth.repository";
import type { BackendErrorModel } from "../../models/error.model";
import type { UsecaseOutput } from "../../models/usecase-output.model";
import type { LoginResponseUsecase } from "./login.output";

import { mapToUsecaseLoginError } from "./mappers/login-error.mapper";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(
    input: LoginUsecaseInput,
  ): Promise<UsecaseOutput<LoginResponseUsecase, BackendErrorModel>> {
    const { email, password } = input;
    const loginResponse = await this.authRepository.login({ email, password });

    if (!loginResponse.success) {
      return {
        success: false,
        data: {
          errorCode: mapToUsecaseLoginError(loginResponse.data.errorCode),
        },
      };
    }

    return {
      success: true,
      data: {
        user: {
          id: loginResponse.data.user.user_id,
          email: loginResponse.data.user.email,
          emailVerified: loginResponse.data.user.user_metadata.email_verified,
        },
        session: {
          accessToken: loginResponse.data.session.access_token,
          refreshToken: loginResponse.data.session.refresh_token,
          expiresAt: loginResponse.data.session.expires_at,
        },
        // Business logic
        // isFirstLogin: false, // lógica de negocio
        // roles: ["USER"],     // lógica de negocio
      },
    };
  }
}
