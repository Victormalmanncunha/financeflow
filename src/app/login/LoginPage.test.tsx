import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./page";
import "@testing-library/jest-dom";
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => ({
    get: (param: string) => (param === "success" ? "registered" : null),
  }),
}));

describe("Testes da página de login", () => {
  beforeEach(() => {
    render(<Login />);
  });

  it("Deve exibir o titúlo 'Login'", () => {
    expect(screen.getByRole("heading", { name: /Login/i })).toBeInTheDocument();
  });

  it("Deve exibir os campos do formulário", () => {
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("Deve exibir um erro se o usuário tentar logar sem preencher os campos", async () => {
    fireEvent.submit(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Todos os campos obrigatórios devem ser preenchidos.")
      ).toBeInTheDocument();
    });
  });

  it("Deve redirecionar para a página de cadastro ao clicar em ''", () => {
    fireEvent.click(screen.getByText("Não tem uma conta?"));

    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  it("Deve exibir a mensagem de sucesso quando houver o parâmetro 'success=registered'", () => {
    expect(
      screen.getByText("Cadastro realizado com sucesso! Faça login.")
    ).toBeInTheDocument();
  });
});
