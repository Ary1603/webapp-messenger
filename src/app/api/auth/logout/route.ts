import { LogoutUsecase } from "@/server/application/auth/logout/logout.usecase";
import { AuthInfraRepository } from "@/server/infrastructure/supabase/repositories/auth.infra-repository";
import { webAppResponder } from "@/utils/api/responderHandler";

export async function GET() {
  try {
    const authRepository = new AuthInfraRepository();

    const usecase = new LogoutUsecase(authRepository);

    await usecase.execute();

    return webAppResponder({ data: {}});
  } catch (error) {
    console.error("Error on the route GET /logout -> ", error);
  }
}
