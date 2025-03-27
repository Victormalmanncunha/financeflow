import { render, screen } from "@testing-library/react";
import LandingPage from "./page";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Teste da Landing Page", () => {
  beforeEach(() => {
    render(<LandingPage />);
  });
  it('Deve exibir o texto "FinanceFlow"', () => {
    const title = screen.getByText(/FinanceFlow/i);
    expect(title).toBeInTheDocument();
  });

  it('Deve conter a navegação com "Sobre" e "Contato"', () => {
    expect(screen.getByText(/Sobre/i)).toBeInTheDocument();
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();
  });

  it('Deve exibir o texto promocional "#1 aplicativo de gerenciamento de finanças."', () => {
    expect(
      screen.getByText(/#1 aplicativo de gerenciamento de finanças./i)
    ).toBeInTheDocument();
  });

  it("Deve renderizar o formulário de inscrição", () => {
    expect(screen.getByTestId("landing-page-form")).toBeInTheDocument();
  });
});
