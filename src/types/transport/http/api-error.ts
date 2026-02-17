export type ApiError = {
  messageCode: string; 
  message: string;
  status: number;
  code: string;
};

export type ErrorMap = Record<string, Omit<ApiError, "code">>;