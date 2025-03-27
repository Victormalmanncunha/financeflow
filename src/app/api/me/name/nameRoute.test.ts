import { GET } from "./route";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

jest.mock("@/lib/prisma", () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("GET API Handler", () => {
  const mockUser = {
    userId: 1,
    userName: "John Doe",
  };

  const mockToken = "valid_token";
  const mockDecoded = { userId: 1 };

  it("Deve retornar 200 e o nome do usuário quando o token é válido", async () => {
    // Mock de jwt.verify
    jwt.verify.mockReturnValue(mockDecoded);

    // Mock de prisma.user.findUnique
    prisma.user.findUnique.mockResolvedValue(mockUser);

    // Mock do req.cookies.get
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: mockToken }),
      },
    };

    // Chamar o handler da API
    const response = await GET(req as NextRequest);

    // Verificar se a resposta foi correta
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toBe(mockUser.userName);
  });

  it("Deve retornar 401 quando não houver token", async () => {
    const req = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
    };

    const response = await GET(req as NextRequest);

    expect(response.status).toBe(401);
    const responseBody = await response.text();
    expect(responseBody).toBe("Token não encontrado");
  });

  it("Deve retornar 500 se ocorrer um erro ao verificar o token", async () => {
    // Simula erro no jwt.verify
    jwt.verify.mockImplementationOnce(() => {
      throw new Error("Invalid token");
    });

    const req = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: mockToken }),
      },
    };

    const response = await GET(req as NextRequest);

    expect(response.status).toBe(500);
    const responseBody = await response.json();
    expect(responseBody.error).toBe("Erro ao buscar usuário");
  });
});
