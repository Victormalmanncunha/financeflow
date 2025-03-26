import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Supondo que você tenha o prisma configurado

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  console.log(url);
  const userId = url.pathname.split("/")[2];
  console.log(userId);

  if (!userId) {
    return NextResponse.json(
      { error: "User ID não encontrado" },
      { status: 400 }
    );
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: Number(userId) }, // Filtrando pelas transações do usuário
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
