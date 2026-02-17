import { PortError, PortResult } from "../../models/port.model";
import { UserProfile } from "../models/user-profile";

export interface UserRepository {
    createUserProfile(input: UserProfile): Promise<PortResult<any,PortError>>
}