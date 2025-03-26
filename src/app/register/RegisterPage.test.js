import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./page";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush, // Usa a variável global do mock
  }),
}));

describe("Teste da página de cadastro", () => {
  beforeEach(() => {
    render(<Register />);
  });

  it("Deve exibir o título 'Cadastro'", () => {
    expect(screen.getByText("Cadastro")).toBeInTheDocument();
  });

  it("Deve exibir os campos do formulário", () => {
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Número de telefone")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
  });

  it("Deve exibir um erro se o usuário tentar cadastrar sem preencher os campos", async () => {
    fireEvent.submit(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Todos os campos obrigatórios devem ser preenchidos.")
      ).toBeInTheDocument();
    });
  });

  it("Deve exibir um erro se o telefone for inválido", async () => {
    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Victor" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "teste@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Número de telefone"), {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "12345678" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Digite um telefone válido.")
      ).toBeInTheDocument();
    });
  });

  it("Deve exibir um erro se a senha tiver menos de 8 caracteres", async () => {
    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Victor" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "teste@email.com" },
    });
    fireEvent.change(screen.getByLabelText("Número de telefone"), {
      target: { value: "(11) 91234-5678" },
    });
    fireEvent.change(screen.getByLabelText("Senha"), {
      target: { value: "1234" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText("A senha deve conter pelo menos 8 caracteres.")
      ).toBeInTheDocument();
    });
  });

  it("Deve redirecionar para a página de login ao clicar em 'Já tem uma conta?'", () => {
    fireEvent.click(screen.getByText("Já tem uma conta?"));

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
