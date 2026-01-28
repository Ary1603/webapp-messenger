//import { AuthLoginInfraErrorCode } from "./auth-login.infra-error-code";
import { SupabaseLoginAuthSuccessModel } from "./supabase-login-auth-success.model";

export type AuthLoginInfraResult =
  | {
      type: "SUCCESS";
      data: SupabaseLoginAuthSuccessModel;
    }
  | {
      type: "ERROR";
      errorCode: string;
      error?: unknown;
    };