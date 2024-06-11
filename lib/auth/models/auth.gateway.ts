import { AuthUser } from "./auth.model";

export interface AuthGateway {
  //onAuthStateChanged(listener: (user: AuthUser) => void): void;
  authenticateWithGoogle(): Promise<AuthUser>;
  authenticateWithGithub(): Promise<AuthUser>;
}
