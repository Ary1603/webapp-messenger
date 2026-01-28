export interface UserVM {
  /** Unique user identifier */
  id: string;

  /** User email address (used for display or settings) */
  email: string;

  /** Friendly name shown in the UI */
  displayName: string;

  /** Optional avatar image URL */
  avatarUrl?: string;

  /** Indicates if the user's email is verified */
  isEmailVerified: boolean;
}