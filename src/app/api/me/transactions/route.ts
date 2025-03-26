import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return new Response("Token não encontrado", { status: 401 });
  }

  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY não definida no arquivo .env");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const id = decoded.userId;

    const transactions = await prisma.transaction.findMany({
      where: { userId: Number(id) }, // Filtrando pelas transações do usuário
      orderBy: { createdAt: "desc" }, // Pode ordenar pelas transações mais recentes
    });

    return NextResponse.json({ transactions }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar transações" },
      { status: 500 }
    );
  }
}
