import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    console.log("Estoy en el POST jeje");
    return NextResponse.json({ message: "Hola Mundo" }, { status: 200 });
}