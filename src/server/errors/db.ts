// src/errors/core.ts
import { ErrorMap } from "@/types/transport/http/api-error";

export const dbErrors: ErrorMap = {
  42501: { messageCode: 'DB-1000', message: "new row violates row-level security policy for table 'users'", status: 400 },
};