export type ApiError = {
  messageCode: string; 
  message: string;
  status: number;
};

export type ErrorMap = Record<string, Omit<ApiError, "code">>;