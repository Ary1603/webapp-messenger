
import { PortError, PortResult } from "../models/port.model";
import { UserProfile } from "../user/models/user-profile";

export interface UserRepository {
    createUserProfile(input: UserProfile): Promise<PortResult<any,PortError>>;
    getUsersByUsernameOrName(input: { query: string;}): Promise<PortResult<any, PortError>>;
}