/* Types */
import type { LoginUsecaseInput } from "./login.input";
import type { AuthRepository } from "@/server/application/auth/ports/auth.repository";

import { mapToUsecaseLoginError } from "../mappers/login-error.mapper";
import { BackendErrorModel } from "../../models/error.model";
import { UsecaseOutput } from "../../models/usecase-output.model";

export class LoginUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(
    input: LoginUsecaseInput,
  ): Promise<UsecaseOutput<any, BackendErrorModel>> {
    const { email, password } = input;
    const loginResponse = await this.authRepository.login({ email, password });

    if (!loginResponse.success) {
      return {
        success: false,
        errors: []
          errorCode: mapToUsecaseLoginError(loginResponse.data.errorCode),
        ,
      };
    }

    return {
      success: true,
      data: {
        user: {
          id: loginResponse.data.userId,
          email: loginResponse.data.email,
          emailVerified: ""//loginResponse.data.,
        },
        session: {
          accessToken: loginResponse.data.accessToken,
          refreshToken: "", //infraResult.data.session.refresh_token,
          expiresAt: "", //infraResult.data.session.expires_at,
        },
        // Business logic example
        // isFirstLogin: false, // lógica de negocio
        // roles: ["USER"],     // lógica de negocio
      },
    };
  }
}
