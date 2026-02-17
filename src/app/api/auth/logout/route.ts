import { LogoutUsecase } from "@/server/application/auth/logout/logout.usecase";
import { SupabaseAuthRepository } from "@/server/infrastructure/auth/auth.infra-repository";
import { webAppResponder } from "@/utils/api/responderHandler";

export async function GET() {
  try {
    const authRepository = new SupabaseAuthRepository();

    const usecase = new LogoutUsecase(authRepository);

    await usecase.execute();

    return webAppResponder({ data: {}});
  } catch (error) {
    console.error("Error on the route GET /logout -> ", error);
  }
}
