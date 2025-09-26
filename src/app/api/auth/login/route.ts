import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      // aquí tu lógica
      throw new Error("Algo salió mal");
    } catch (error) {
      return NextResponse.json(
        { error: "Error interno del servidor" },
        { status: 500 }
      );
    }
  }