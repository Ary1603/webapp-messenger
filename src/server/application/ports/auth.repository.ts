/* Types */
import { LoginCredentials } from "../models/login-credentials";
import { AuthSession } from "../models/auth-session";
import { PortError, PortResult } from "../../models/port.model";
import { AuthUser } from "../models/auth-user";
import { UserCredentials } from "../models/register-credentials";

export interface AuthRepository {
    login(input: LoginCredentials): Promise<PortResult<AuthSession, PortError>>;
    logout(): Promise<PortResult<void, PortError>>;
    getCurrentUser(): Promise<PortResult<AuthUser, PortError>>;
    registerUserCredentials(input: LoginCredentials): Promise<PortResult<UserCredentials, PortError>>;
}