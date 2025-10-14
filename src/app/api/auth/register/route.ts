// app/api/auth/register/route.ts
import { NextRequest } from "next/server";
import { signUpSchema } from "@/types/api/auth/signup";
import { getJSONBody } from "@/utils/parse/getJSONBody";
//import { successResponse, errorResponse } from "@/utils/api/responderHanlder";
// Services
import { signupService } from "@/server/modules/auth/services/register-user.service";
import { webAppResponder } from "@/utils/api/responderHandler";

// Reemplaza COMPLETAMENTE tu función POST por ésta:
export async function POST(req: NextRequest) {
  try {
    const body = await getJSONBody(req);
    if (!body) return webAppResponder(null, ["CORE_1003"]);

    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return webAppResponder(null, ["CORE_1003"]);
    }

    const response = await signupService(parsed.data);
    console.log("Este es el response del route.ts: ", response);

    if (response.errors.length) {
      console.log("Estoy en el route.ts: ", response.errors);
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

// Definir el schema de entrada
// const BodySchema = z.object({
//   field1: z.string(),
//   field2: z.number().optional(),
// });

// POST handler
// export async function POST(req: Request, res: Response) {
//     console.log("Estoy en el POST");
//     return NextResponse.json({ message: "Hola Mundo" }, { status: 200 });

//   try {
//     const json = await req.json();
//     const data = BodySchema.parse(json);     // Validar entrada

//     //const result = await someUseCase(data);  // Llamar caso de uso

//     return NextResponse.json(result, { status: 201 }); // Respuesta OK
//   } catch (err) {
//     if (err instanceof z.ZodError) {
//       return NextResponse.json({ error: err.errors }, { status: 400 });
//     }
//     console.error(err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
//}

// GET handler (opcional)
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");

//     const result = await someUseCase({ id });

//     return NextResponse.json(result, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }
