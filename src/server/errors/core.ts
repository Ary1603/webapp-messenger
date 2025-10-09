// src/errors/core.ts
import { ErrorMap } from "@/schemas/api/api-error";

export const coreErrors: ErrorMap = {
  INVALID_JSON: { messageCode: '1000', message: "Invalid JSON body", status: 400 },
  VALIDATION_FAILED: { messageCode: '1000', message: "Validation failed", status: 400 },
  INTERNAL_ERROR: { messageCode: '1000', message: "Internal Server Error", status: 500 },
};