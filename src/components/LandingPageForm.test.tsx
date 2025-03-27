import { render, screen, fireEvent } from "@testing-library/react";
import LandingPageForm from "./LandingPageForm";
import "@testing-library/jest-dom";
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Teste do formulario da landing page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<LandingPageForm />);
  });

  it("Deve exibir um campo de email.", () => {
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  });

  it("Deve redirecionar para a página de cadastro ao clicar no botão 'Cadastrar'", () => {
    fireEvent.click(screen.getByText("Cadastrar"));

    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  it("Deve redirecionar para a página de cadastro com o email na URL se for preenchido", () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "teste@email.com" } });

    fireEvent.click(screen.getByText("Cadastrar"));

    expect(mockPush).toHaveBeenCalledWith("/register?email=teste%40email.com");
  });

  it("Deve atualizar o input de email ao digitar", () => {
    const emailInput = screen.getByPlaceholderText(/Email/i);
    fireEvent.change(emailInput, { target: { value: "teste@email.com" } });

    expect(emailInput).toHaveValue("teste@email.com");
  });

  it("Deve redirecionar para a página de login ao clicar em 'Já possui uma conta?'", () => {
    fireEvent.click(screen.getByText("Já possui uma conta?"));

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
