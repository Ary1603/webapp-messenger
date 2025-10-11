// app/api/auth/register/route.ts
import { z } from "zod";
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
    console.log("Iniciando el POST");
    const body = await getJSONBody(req)
    if (body) return webAppResponder()//return errorResponse("CORE.INVALID_JSON")
        //xxreturn errorResponse("CORE.INVALID_JSON");
//         return errorResponse("CORE.INVALID_JSON");
// return errorResponse("AUTH.UNAUTHORIZED");
// return errorResponse("PAYMENTS.PROVIDER_UNAVAILABLE", { provider: "Stripe" });
    //   return NextResponse.json(
    //     { error: "Invalid JSON body" },
    //     { status: 400 }
    //   );
    

    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) return errorResponse("CORE.INVALID_JSON")

      // Opcional: formatear errores de Zod
      //const zodErrors = z.flattenError(parsed.error);
      //return errorResponse()
      // return NextResponse.json(
      //   { error: "Validation failed", formErrors, fieldErrors },
      //   { status: 400 }
      // );
    //}

    console.log("Este es el parsed: ", parsed); 

    // const { email, password } = parsed.data;

    

    // TODO: tu lógica de registro aquí (crear usuario, hashing, etc.)
    //* Create/register user on webApp (supabase)
    await signupService(parsed.data)
    // return NextResponse.json(
    //   { ok: true, received: parsed.data, email },
    //   { status: 200 }
    // );
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