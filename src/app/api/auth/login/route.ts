import { NextRequest } from "next/server";
import { getJSONBody } from "@/utils/parse/getJSONBody";
// Use case
import { LoginUseCase } from "@/server/application/auth/login/login.usecase";
// Utils - Helpers
import { webAppResponder } from "@/utils/api/responderHandler";
import { AuthInfraRepository } from "@/server/infrastructure/supabase/repositories/auth.infra-repository";

export async function POST(request: NextRequest) {
  try {
    const authRepository = new AuthInfraRepository();

    const body = await getJSONBody(request);

    if (!body) return webAppResponder(null, ["CORE_INVALID_JSON"]);

    const usecase = new LoginUseCase(authRepository);

    const response = await usecase.execute(body);

    if (!response.success) {
      const errors = [];
      errors.push(response.data.errorCode);
      return webAppResponder(null, errors);
    }

    return webAppResponder(response);
  } catch (error) {
    console.error("Unexpected error on route login POST: ", error);
    return webAppResponder(null, ["CORE_INTERNAL_ERROR"]);
  }
}
