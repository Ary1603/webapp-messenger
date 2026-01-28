// src/errors/core.ts
import { ErrorMap } from "@/types/transport/http/api-error";

export const coreErrors: ErrorMap = {
  UNKNOWN_ERROR: { messageCode: 'CORE-1000', message: "Unexpected error encountered. No additional details available.", status: 400 },
  INVALID_JSON: { messageCode: 'CORE-1001', message: "Invalid JSON body", status: 400 },
  VALIDATION_FAILED: { messageCode: 'CORE-1002', message: "Validation failed", status: 400 },
  INTERNAL_ERROR: { messageCode: 'CORE-1003', message: "Internal Server Error", status: 500 },
  UNIDENTIFIED_USER: { messageCode: 'CORE-1004', message: "Unidentified user", status: 401}
  
};