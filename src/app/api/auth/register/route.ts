import { NextRequest } from "next/server";
import { getJSONBody } from "@/utils/parse/getJSONBody";
// Usecase
import { RegisterUserUsecase } from "@/server/application/auth/register/register-user.usecase";
// Services - Repositories
import { SupabaseAuthRepository } from "@/server/infrastructure/auth/auth.infra-repository";
import { SupabaseUserRepository } from "@/server/infrastructure/user/user.repository";
// Utils
import { webAppResponder } from "@/utils/api/responderHandler";

export async function POST(request: NextRequest) {
  try {
    const authRepository = new SupabaseAuthRepository();
    const userRepository = new SupabaseUserRepository();

    const body = await getJSONBody(request);
    if(!body) return webAppResponder(null, ["CORE_INVALID_JSON"]);

    const usecase = new RegisterUserUsecase(authRepository, userRepository);

    const response = await usecase.execute(body);
    return webAppResponder({
      data: response
    })
  } catch (error) {
    console.error("Unexpected error on route register user POST: ", error);
    return webAppResponder(null, ["CORE_INTERNAL_ERROR"]);
  }
}
