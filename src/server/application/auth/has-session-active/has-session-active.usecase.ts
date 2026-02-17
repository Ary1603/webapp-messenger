import type { checkIfSessionIsActiveResponseDTO } from "@/contracts/auth/session/check-is-session-active.response"

export type CheckIfSessionIsActiveResult = 
    | {
       type: "SUCCESS",
       data: checkIfSessionIsActiveResponseDTO 
    }