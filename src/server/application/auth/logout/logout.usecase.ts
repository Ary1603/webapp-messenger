import { AuthRepository } from "@/server/application/auth/ports/auth.repository";


export class LogoutUsecase {
  constructor(
    private readonly authRepository: AuthRepository
  ) {}

  async execute(): Promise<void> {
    await this.authRepository.logout();
    return;
  }
}