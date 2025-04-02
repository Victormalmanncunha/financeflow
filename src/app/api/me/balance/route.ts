import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return new Response("Token não encontrado", { status: 401 });
  }

  try {
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY não definida no arquivo .env");
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const userId = decoded.userId;

    const foundUser = await prisma.user.findUnique({
      where: { userId: userId },
    });

    const userBalance = foundUser?.balance;

    return NextResponse.json({ userBalance }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const amount = await req.json();
  if (isNaN(Number(amount))) {
    return new Response("Valor inválido", { status: 401 });
  }

  if (!token) {
    return new Response("Token não encontrado", { status: 401 });
  }

  try {
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY não definida no arquivo .env");
    }
    console.log("oi");
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;
    const userId = decoded.userId;

    const updatedUser = await prisma.user.update({
      where: { userId: userId },
      data: { balance: Number(amount) },
    });

    return NextResponse.json(
      { message: "Saldo alterado com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}
