import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getCookie, deleteCookie } from "cookies-next";
import { cookies } from "next/headers";

const SECRET_KEY = process.env.JWT_SECRET;

export async function checkAuth(req: NextRequest) {
  const token = await getCookie("token", { cookies });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY não definida no arquivo .env");
    }

    await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    deleteCookie("token", { cookies });
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export async function redirectIfLoggedIn(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}
