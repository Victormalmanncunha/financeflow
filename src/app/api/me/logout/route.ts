import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Deslogado com sucesso" },
      { status: 200 }
    );
    response.cookies.delete("token");
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Erro ao deslogar" }, { status: 500 });
  }
}
