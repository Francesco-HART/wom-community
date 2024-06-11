import { createTestStore } from "@/lib/create-store";
import { AppProvider } from "../Provider";

describe("Get auth user timeline", () => {
  it("displays the authenticated user timeline on the home page", async () => {
    const store = createTestStore();
    // const router = createRouter({ store });
    // render(<AppProvider store={store} />);
    // expect(await screen.findByText("Hello it's Bob")).toBeInTheDocument();
    // expect(await screen.findByText("Hello it's Alice")).toBeInTheDocument();
  });
});
