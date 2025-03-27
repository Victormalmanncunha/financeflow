import { createMocks } from "node-mocks-http"; // Para simular requisições HTTP
import { GET } from "./route"; // Ajuste o caminho para a sua rota
import prisma from "@/lib/prisma"; // Para mockar o Prisma
import { NextRequest, NextResponse } from "next/server";

// Mock do Prisma para evitar a interação com o banco real durante os testes
jest.mock("@/lib/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}));

describe("Testando a API de usuário", () => {
  it("Deve retornar os dados do usuário corretamente", async () => {
    const mockUser = {
      userId: 1,
      userName: "Teste",
      email: "teste@example.com",
    };

    // Mock de resposta do Prisma
    prisma.user.findUnique.mockResolvedValue(mockUser);

    const { req, res } = createMocks({
      method: "GET",
      query: { id: "1" }, // Aqui você simula a query com o id
    });

    // Chama a função da API diretamente
    await GET(req as NextRequest, { params: { id: "1" } });

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData()).user).toEqual(mockUser);
  });

  it("Deve retornar erro 500 se o Prisma falhar", async () => {
    // Simula um erro ao tentar buscar o usuário
    prisma.user.findUnique.mockRejectedValue(new Error("Erro de banco"));

    const { req, res } = createMocks({
      method: "GET",
      query: { id: "1" },
    });

    // Chama a função da API diretamente
    await GET(req as NextRequest, { params: { id: "1" } });

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData()).error).toBe("Erro ao buscar usuário");
  });

  it("Deve retornar erro 400 se o id não for fornecido", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    // Chama a função da API diretamente
    await GET(req as NextRequest, { params: { id: "" } });

    expect(res._getStatusCode()).toBe(400); // ou outro código se necessário
    expect(JSON.parse(res._getData()).error).toBe("ID não fornecido");
  });
});
