import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "./page";
import "@testing-library/jest-dom";
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Testes da página dashboard", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ transactions: [] }), // Mocking an empty array
      })
    ) as jest.Mock;
    render(<Dashboard />);
  });

  it("Deve montar os componentes corretamente", async () => {
    await waitFor(() => {
      expect(screen.getByTestId("user-greeting")).toBeInTheDocument();
      expect(screen.getByTestId("current-balance")).toBeInTheDocument();
      expect(
        screen.getByTestId("dashboard-transaction-list")
      ).toBeInTheDocument();
    });
  });
});
