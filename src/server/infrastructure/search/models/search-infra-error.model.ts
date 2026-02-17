import { SearchInfraErrorCode } from "./search-infra.error";

export interface SearchInfraError {
  errorCode: SearchInfraErrorCode;
  errorData?: unknown;
}