import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  if (!token) {
    return new Response("Token não encontrado", { status: 401 });
  }

  try {
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY não definida no arquivo .env");
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded;
    console.log(decoded);

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
