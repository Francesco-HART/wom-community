import { createAsyncAppThunk } from "@/lib/create-app-thunk";

export const authenticateWithGithub = createAsyncAppThunk(
  "auth/authenticateWithGithub",
  async (_, { extra: { authGateway } }) => {
    const authUser = await authGateway.authenticateWithGithub();

    return authUser;
  }
);
