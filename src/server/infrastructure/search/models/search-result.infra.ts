import { SearchInfraError } from "./search-infra-error.model";
import { SupabaseSearchSuccessModel } from "./supabase-search-success.model";


export type SearchInfraResult = 
    | {
        type: "SUCCESS";
        data: SupabaseSearchSuccessModel;
    }
    | {
        type: "ERROR";
        error: SearchInfraError;
    }
