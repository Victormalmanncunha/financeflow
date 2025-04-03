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

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { amount, category, type, description, transactionDate } =
    await req.json();

  if (!token) {
    return new Response("Token não encontrado", { status: 401 });
  }

  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY não definida no arquivo .env");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const id = decoded.userId;

    await prisma.transaction.create({
      data: {
        userId: id,
        amount: amount,
        category: category,
        type: type,
        description: description,
        transactionDate: new Date(transactionDate + "T00:00"),
      },
    });

    await prisma.user.update({
      where: { userId: id },
      data: {
        balance:
          type === "INCOME" ? { increment: amount } : { decrement: amount },
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar transação" },
      { status: 500 }
    );
  }
}
