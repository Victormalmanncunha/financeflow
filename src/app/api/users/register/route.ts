import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { userName, userEmail, userPhone, userPassword } = await req.json();

    if (!userName || !userEmail || !userPhone || !userPassword) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        userName,
        userEmail,
        userPhone,
        userPassword: hashedPassword,
        firstVisit: true,
      },
    });

    return NextResponse.json(
      { message: "Usuário cadastrado com sucesso!", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Erro ao cadastrar usuário" },
      { status: 500 }
    );
  }
}
