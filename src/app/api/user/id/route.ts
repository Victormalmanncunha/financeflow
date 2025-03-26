import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"; // Certifique-se de instalar o jwt (npm install jsonwebtoken)

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token não encontrado" },
        { status: 401 }
      );
    }
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY não definida no arquivo .env");
    }

    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

    const userId = decoded.userId;

    return NextResponse.json({ userId }, { status: 200 });
  } catch (error) {
    console.error("Erro ao verificar token:", error);
    return NextResponse.json(
      { error: "Erro ao verificar token" },
      { status: 500 }
    );
  }
}
