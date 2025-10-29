import { NextRequest } from "next/server";
import { signUpSchema } from "@/types/api/auth/signup";
import { getJSONBody } from "@/utils/parse/getJSONBody";
// Services
import { getUserChats } from "@/server/modules/services/chats/get-chats.service";
// Utils - Helpers
import { webAppResponder } from "@/utils/api/responderHandler";
import { createUserRequestSchema } from "@/types/api/user/user";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    console.log("API GET Chats userId:", userId);
    await getUserChats(userId);
    return "Hola mundo";

    // const parsed = createUserRequestSchema.safeParse(body);

    // if (!parsed.success) {
    //   return webAppResponder(null, ["CORE_INVALID_JSON"]);
    // }

    // //* Call Signup Service
    // const response = await signupService(parsed.data);

    // if (response.errors.length) {
    //   return webAppResponder(
    //     null,
    //     response.errors.map(e => e.messageCode || "UNKNOWN_ERROR")
    //   );
    // }

    // return webAppResponder(response.data);
  } catch (err) {
    console.error("Error en POST /api/auth/register:", err);
    //return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
