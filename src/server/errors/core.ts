// src/errors/core.ts
import { ErrorMap } from "@/types/api/api-error";

export const coreErrors: ErrorMap = {
  CORE_1003: { messageCode: 'CORE-1003', message: "Invalid JSON body JUAS JUAS", status: 400 },
  INVALID_JSON: { messageCode: 'CORE-1003', message: "Invalid JSON body", status: 400 },
  VALIDATION_FAILED: { messageCode: 'CORE-1004', message: "Validation failed", status: 400 },
  INTERNAL_ERROR: { messageCode: 'CORE-1005', message: "Internal Server Error", status: 500 },
};