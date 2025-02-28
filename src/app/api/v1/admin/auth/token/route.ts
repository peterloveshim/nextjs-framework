import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_HEADERS, endpoints } from "@/constants/endpoint.constant";

export async function GET(req: NextRequest) {
  try {
    // 파라미터 검증 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const login_id = req.nextUrl.searchParams.get("login_id");
    const login_pw = req.nextUrl.searchParams.get("login_pw");

    if (!login_id || !login_pw) throw new Error("400, 유효하지 않은 파라미터");
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    const queryString = new URLSearchParams({ login_id, login_pw });
    const url = `${endpoints.server.v1.auth.token}?${queryString}`;

    return await fetch(url, { method: "GET", headers: DEFAULT_HEADERS });
  } catch (err) {
    //const message = err.message || 'Internal Server Error';
    const message = `${endpoints.server.v1.auth.token}`;
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 파라미터 검증 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const { login_id, login_pw, otp } = await req.json();

    if (!login_id || !login_pw || !otp)
      throw new Error("400, 유효하지 않은 파라미터");
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

    const url = endpoints.server.v1.auth.token;

    return await fetch(url, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify({ login_id, login_pw, otp }),
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
