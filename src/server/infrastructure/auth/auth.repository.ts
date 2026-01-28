/* Types */
import type { AuthLoginInfraResult } from "./models/auth-login.infra-result";
import type { AuthUser } from "@/types/domain/auth/user"; 

export interface AuthRepository {
    login(email: string, password: string): Promise<AuthLoginInfraResult>;
    getCurrentUser(): Promise<AuthUser | null>;
    checkIfSessionIsActive(): Promise<void>;
}