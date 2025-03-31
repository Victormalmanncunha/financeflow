import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(
  req: NextRequest,
  { params }: { params: { transactionId: string } }
) {
  const parameters = await params;
  const transactionId = parameters.transactionId;
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

    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(transactionId) },
    });

    if (transaction?.userId !== Number(id)) {
      return NextResponse.json(
        { error: "Transação não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json({ transaction }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar transações" },
      { status: 500 }
    );
  }
}
