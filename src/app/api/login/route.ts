import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signToken, COOKIE_NAME } from "@/src/lib/auth";

export async function POST(request: NextRequest) {
  const password = process.env.PASSWORD;
  if (!password) {
    return NextResponse.json({ error: "This site is not password protected." }, { status: 400 });
  }

  let submitted = "";
  try {
    const body = await request.json();
    submitted = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Could not read your answer." }, { status: 400 });
  }

  if (submitted !== password) {
    return NextResponse.json({ error: "That password is not right. Try again." }, { status: 401 });
  }

  const token = await signToken(password, crypto.randomUUID());
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return NextResponse.json({ ok: true });
}
