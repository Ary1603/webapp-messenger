// src/errors/index.ts
import type { ApiError, ErrorMap} from "@/types/api/api-error"; 
import { coreErrors } from "./core";
import { authErrors } from "./auth";
//import { paymentErrors } from "./payments";

type Registry = Record<string, ApiError>;

// export function failWithCode(code: keyof typeof AllErrors | string, meta: Partial<MetaBase> = {}) {
//   const error = getError(code);
//   return fail(error, meta);
// }

/** Prefija cada clave con el namespace (p.ej. AUTH.USER_NOT_FOUND) */
function withNamespace(ns: string, map: ErrorMap): Registry {
  return Object.fromEntries(
    Object.entries(map).map(([k, v]) => [
      `${ns}.${k}`,
      { code: `${ns}.${k}`, messageCode: `${v.messageCode}`, message: v.message, status: v.status },
    ])
  );
}

export const AllErrors: Registry = {
  ...withNamespace("CORE", coreErrors),
  ...withNamespace("AUTH", authErrors),
  //...withNamespace("PAYMENTS", paymentErrors),
};

// (opcional) helper para obtener por clave namespaced
export function getError(code: keyof typeof AllErrors | string): ApiError {
  const err = AllErrors[code as string];
  if (!err) {
    // Fallback seguro
    return AllErrors["CORE.INTERNAL_ERROR"];
  }
  return err;
}