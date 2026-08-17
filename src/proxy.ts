import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/src/lib/auth";

export async function proxy(request: NextRequest) {
  const password = process.env.PASSWORD;
  if (!password) return NextResponse.next();

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (await verifyToken(password, token)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/password";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|favicon|password|api|.*\\..*).*)"],
};
