import { LoginErrorCode } from "./login.error-code";
import type { LoginSuccessOutput } from "./login.output";

export type LoginResult =
  | {
      type: "SUCCESS";
      data: LoginSuccessOutput;
    }
  | {
    type: "ERROR";
    errorCode: LoginErrorCode;
  }