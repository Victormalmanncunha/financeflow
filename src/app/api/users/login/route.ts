import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { cookies } from "next/headers";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const { userEmail, userPassword } = await req.json();

    if (!userEmail || !userPassword) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const foundUser = await prisma.user.findUnique({
      where: { userEmail: userEmail },
    });

    if (!foundUser) {
      return NextResponse.json(
        { error: "Email ou senha incorretos." },
        { status: 400 }
      );
    }
    const passwordIsTheSame = await bcrypt.compare(
      userPassword,
      foundUser.userPassword
    );

    if (!passwordIsTheSame) {
      return NextResponse.json(
        { error: "Email ou senha incorretos." },
        { status: 400 }
      );
    }

    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY não definida no arquivo .env");
    }

    const token = jwt.sign({ userId: foundUser.userId }, SECRET_KEY, {
      expiresIn: "1h",
    });
    cookieStore.set("token", token, {
      maxAge: 60 * 60 * 1,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return NextResponse.json(
      {
        message: "Login bem-sucedido!",
        token,
        firstVisit: foundUser.firstVisit,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao cadastrar usuário" },
      { status: 500 }
    );
  }
}
