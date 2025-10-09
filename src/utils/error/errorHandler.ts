// src/utils/error/errorHandler.ts
import { NextResponse } from "next/server";
import { getError } from "@/server/errors"; 

type Extra = Record<string, unknown>;

export function errorResponse(code: string, extra?: Extra) {
  const err = getError(code);
  return NextResponse.json(
    { error: err.message, messageCode: err.messageCode, ...extra },
    { status: err.status }
  );
}