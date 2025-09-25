// app/api/RESOURCE/route.ts
// import { z } from "zod";
import { NextResponse } from "next/server";
//import { someUseCase } from "@/features/RESOURCE/server/usecases/someUseCase";

// Definir el schema de entrada
// const BodySchema = z.object({
//   field1: z.string(),
//   field2: z.number().optional(),
// });

// POST handler
export async function POST(req: Request, res: Response) {
    console.log("Estoy en el POST");
    return NextResponse.json({ message: "Hola Mundo" }, { status: 200 });

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
}

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