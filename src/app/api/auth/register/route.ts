import { NextRequest } from "next/server";
import { signUpSchema } from "@/types/api/auth/signup";
import { getJSONBody } from "@/utils/parse/getJSONBody";
// Services
import { signupService } from "@/server/application/auth/register-user.usecase";
// Utils - Helpers
import { webAppResponder } from "@/utils/api/responderHandler";
import { createUserRequestSchema } from "@/types/api/user/user";

export async function POST(req: NextRequest) {
  try {
    const body = await getJSONBody(req);
    if (!body) return webAppResponder(null, ["CORE_INVALID_JSON"]);

    const parsed = createUserRequestSchema.safeParse(body);

    if (!parsed.success) {
      return webAppResponder(null, ["CORE_INVALID_JSON"]);
    }

    //* Call Signup Service
    const response = await signupService(parsed.data);

    if (response.payload.errors?.length) {
      return webAppResponder(
        null,
        response.payload.errors.map((e) => e.messageCode || "UNKNOWN_ERROR")
      );
    }

    return webAppResponder(response.payload);
  } catch (err) {
    console.error("Error en POST /api/auth/register:", err);
    //return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
