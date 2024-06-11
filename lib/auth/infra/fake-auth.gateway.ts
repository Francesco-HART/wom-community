import { AuthGateway } from "../models/auth.gateway";
import { AuthUser } from "../models/auth.model";

export class FakeAuthGateway implements AuthGateway {
  willSucceedForGoogleAuthForUser!: AuthUser;
  willSucceedForGithubAuthForUser!: AuthUser;

  constructor(private readonly delay = 0) {}
  //   onAuthStateChanged(listener: (user: string) => void): void {
  //     this.onAuthStateChangedListener = listener;
  //   }

  authenticateWithGoogle(): Promise<AuthUser> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(this.willSucceedForGoogleAuthForUser),
        this.delay
      )
    );
  }

  authenticateWithGithub(): Promise<AuthUser> {
    return new Promise((resolve) =>
      setTimeout(
        () => resolve(this.willSucceedForGithubAuthForUser),
        this.delay
      )
    );
  }

  //   simulateAuthStateChanged(authUser: string) {
  //     this.onAuthStateChangedListener(authUser);
  //   }
}

export const authGateway = new FakeAuthGateway();
