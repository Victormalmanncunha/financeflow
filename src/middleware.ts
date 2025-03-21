import { NextRequest, NextResponse } from "next/server";
import { checkAuth, redirectIfLoggedIn } from "./lib/authMiddleware";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    return checkAuth(req);
  }

  if (["/login", "/register"].includes(pathname)) {
    return redirectIfLoggedIn(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
