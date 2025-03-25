import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { userId: Number(userId) },
      });
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Erro ao buscar usuário" },
        { status: 500 }
      );
    }
  }
}
