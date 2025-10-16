import { NextRequest } from "next/server";
import { signUpSchema } from "@/types/api/auth/signup";
import { getJSONBody } from "@/utils/parse/getJSONBody";
// Services
import { signupService } from "@/server/modules/auth/services/register-user.service";
// Utils - Helpers
import { webAppResponder } from "@/utils/api/responderHandler";

export async function POST(req: NextRequest) {
  try {
    const body = await getJSONBody(req);
    if (!body) return webAppResponder(null, ["CORE_INVALID_JSON"]);

    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return webAppResponder(null, ["CORE_INVALID_JSON"]);
    }

    //* Call Signup Service
    const response = await signupService(parsed.data);

    if (response.errors.length) {
      return webAppResponder(
        null,
        response.errors.map(e => e.messageCode || "UNKNOWN_ERROR")
      );
    }

    return webAppResponder(response.data);
  } catch (err) {
    console.error("Error en POST /api/auth/register:", err);
    //return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}