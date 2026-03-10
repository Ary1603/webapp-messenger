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

        console.log("Info user profile data: ", createUserProfileData);

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
 /* 
 * Se registo las credenciales del usuario: 
responseRegisterUserCredentials -> 
{
  type: 'SUCCESS',
  data: {
    user: {
      id: 'c44550f0-f890-47ae-a1f0-3cfc722df76f',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'test2@test2.com',
      email_confirmed_at: '2026-02-03T22:09:27.555798516Z',
      phone: '',
      last_sign_in_at: '2026-02-03T22:09:27.574298854Z',
      app_metadata: [Object],
      user_metadata: [Object],
      identities: [Array],
      created_at: '2026-02-03T22:09:27.475319Z',
      updated_at: '2026-02-03T22:09:27.602361Z',
      is_anonymous: false
    },
    session: {
      access_token: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkhrazJhd1hacjZjSUZwbGIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3Z4cnRwbXBrem1udmpyc2JzbWZ1LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJjNDQ1NTBmMC1mODkwLTQ3YWUtYTFmMC0zY2ZjNzIyZGY3NmYiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcwMTYwMTY3LCJpYXQiOjE3NzAxNTY1NjcsImVtYWlsIjoidGVzdDJAdGVzdDIuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6InRlc3QyQHRlc3QyLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV92ZXJpZmllZCI6ZmFsc2UsInN1YiI6ImM0NDU1MGYwLWY4OTAtNDdhZS1hMWYwLTNjZmM3MjJkZjc2ZiJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzcwMTU2NTY3fV0sInNlc3Npb25faWQiOiIwZWI5NmRkMC0xMzY5LTQzNmItODgxZC00YmMyZTNiNWE1ZmYiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.kz9GuyGlKjwy8RfIQb5SXnPWNlojWd3LnMR7KrPn8Z0',
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: 1770160167,
      refresh_token: 'jiyrmsfk5d4o',
      user: [Object]
    }
  }
}
 */