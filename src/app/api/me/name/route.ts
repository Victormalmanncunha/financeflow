import { NextRequest, NextResponse } from "next/server";
import { User } from "@prisma/client";
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

    const user: User | null = await prisma.user.findUnique({
      where: { userId: Number(userId) },
    });

    return NextResponse.json({ name: user?.userName }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}
