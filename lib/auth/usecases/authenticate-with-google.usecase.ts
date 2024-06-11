import { createAsyncAppThunk } from "@/lib/create-app-thunk";

export const authenticateWithGoogle = createAsyncAppThunk(
  "auth/authenticateWithGoogle",
  async (_, { extra: { authGateway } }) => {
    const authUser = await authGateway.authenticateWithGoogle();
    return authUser;
  }
);
