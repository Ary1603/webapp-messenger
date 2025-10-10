// src/errors/core.ts
import { ErrorMap } from "@/schemas/api/api-error";

export const authErrors: ErrorMap = {
  INVALID_JSON: { messageCode: 'AUTH-1000', message: "Invalid JSON body", status: 400 },
  VALIDATION_FAILED: { messageCode: 'AUTH-1001', message: "Validation failed", status: 400 },
  INTERNAL_ERROR: { messageCode: 'AUTH-1002', message: "Internal Server Error", status: 500 },
};