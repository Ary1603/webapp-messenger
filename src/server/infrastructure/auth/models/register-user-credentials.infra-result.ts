export type RegisterCredentialsInfraResult =
  | {
      type: "SUCCESS";
      data: {
        userId: string;
        email: string;
      };
    }
  | {
      type: "ERROR";
      errorCode: string;
      error?: unknown;
    };