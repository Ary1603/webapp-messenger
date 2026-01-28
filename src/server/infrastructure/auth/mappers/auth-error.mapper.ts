// const SUPABASE_LOGIN_ERROR_RESULT_MAP: Record<string, string> = {

// }

// import type { LoginResult } from "@/server/application/auth/login/login.result";

// /**
//  * Supabase error.code → LoginResult completo
//  */
// const SUPABASE_LOGIN_ERROR_RESULT_MAP: Record<string, LoginResult> = {
//   // Credenciales
//   invalid_credentials: {
//     type: "INVALID_CREDENTIALS",
//   },

//   // Cuenta no verificada
// //   email_not_confirmed: {
// //     type: "AUTH_ACCOUNT_NOT_VERIFIED",
// //   },
// //   phone_not_confirmed: {
// //     type: "AUTH_ACCOUNT_NOT_VERIFIED",
// //   },
// //   provider_email_needs_verification: {
// //     type: "AUTH_ACCOUNT_NOT_VERIFIED",
// //   },

// //   // Cuenta bloqueada
// //   user_banned: {
// //     type: "AUTH_ACCOUNT_DISABLED",
// //   },

// //   // Rate limit
// //   over_request_rate_limit: {
// //     type: "AUTH_RATE_LIMITED",
// //   },
// //   over_email_send_rate_limit: {
// //     type: "AUTH_RATE_LIMITED",
// //   },
// //   over_sms_send_rate_limit: {
// //     type: "AUTH_RATE_LIMITED",
// //   },
// };

// export function mapSupabaseLoginError(code?: string): LoginResult {
//   if (!code) {
//     return { type: "UNEXPECTED_ERROR" };
//   }

//   return (
//     SUPABASE_LOGIN_ERROR_RESULT_MAP[code] ?? {
//       type: "AUTH_UNEXPECTED_ERROR",
//       error: code,
//     }
//   );
// }