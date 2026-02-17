// src/mappers/frontend/auth/login.vm.mapper.ts

import type { LoginResponseDTO } from "@/contracts/auth/login/login.response";
import type { UserVM } from "@/types/view-models/user.vm";

export function mapLoginResponseToUserVM(
  dto: LoginResponseDTO
): UserVM {
  return {
    id: dto.user.id,
    email: dto.user.email ?? "",
    displayName: dto.user.email?.split("@")[0] ?? "User",
  };
}