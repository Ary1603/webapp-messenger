import { NextRequest } from "next/server";
import { getJSONBody } from "@/utils/parse/getJSONBody";
// Use case
import { LoginUseCase } from "@/server/application/auth/login/login.usecase";
// Utils - Helpers
import { webAppResponder } from "@/utils/api/responderHandler";
import { LoginSchema } from "@/contracts/auth/login/login.schema";
import { SupabaseAuthRepository } from "@/server/infrastructure/auth/supabase-auth.repository";

// export async function GET() {
//   try {
//     const response = await hasSessionActive();
//     return webAppResponder(response.payload);
//   } catch (error) {
//     console.error("Error on the login API GET: ", error);
//   }
// }

export async function POST(req: NextRequest) {
  try {
    const body = await getJSONBody(req);
    if (!body) return webAppResponder(null, ["CORE_INVALID_JSON"]);

    const parsed = LoginSchema.safeParse(body);

    if (!parsed.success) {
      return webAppResponder(null, ["CORE_INVALID_JSON"]);
    }

    const useCase = new LoginUseCase(new SupabaseAuthRepository());

    //* Call Signup Service
    const result = await useCase.execute(parsed.data);

    if (result.type === "ERROR") {
      return webAppResponder(null, [result.errorCode]);
    }

    return webAppResponder({
      data: result.data,
    });
  } catch (err) {
    console.error("Error en POST /api/auth/register:", err);
    return webAppResponder(null, ["CORE_INTERNAL_ERROR"]);
  }
}
