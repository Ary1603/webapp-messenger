import { AuthRepository } from "../../ports/auth.repository";
import { RegisterUserUsecaseInput } from "./register-user.input";
import { RegisterUserCredentialsUsecaseOutput } from "./register-user.output";
import { UserRepository } from "../../ports/user.repository";
import { UsecaseOutput } from "../../models/usecase-output.model";
import { BackendErrorModel } from "../../models/error.model";
import { mapToUsecaseRegisterUserError } from "./mappers/register-user-error.mapper";


export class RegisterUserUsecase {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly userRepository: UserRepository
    ) {}

    async execute(payload: RegisterUserUsecaseInput): Promise<UsecaseOutput<RegisterUserCredentialsUsecaseOutput,BackendErrorModel>> {
        
        const { email, password, username, birthday, last_name_father, name, last_name_mother } = payload;

        // Register user credentials
        const responseRegisterUserCredentials = await this.authRepository.registerUserCredentials({
            email,
            password
        })

        if(!responseRegisterUserCredentials.success) {
          return {
            success: false,
            data: {
              errorCode: mapToUsecaseRegisterUserError(responseRegisterUserCredentials.data.errorCode)
            }
          }
        }

        const { data } = responseRegisterUserCredentials;

        // Register user profile

        const responseCreateUserProfile = await this.userRepository.createUserProfile({
          username,
          birthday,
          last_name_father,
          last_name_mother,
          name
        });

        const { success: createUserProfileSuccess, data: createUserProfileData } = responseCreateUserProfile;

        if(!createUserProfileSuccess) {
          // Delete user auth created

        }

        const { email: emailRegistered, userId } = data;

        return {
            success: true,
            data: {
              email: emailRegistered,
              userId
            }
        }
    }
}
