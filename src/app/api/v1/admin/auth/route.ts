import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_HEADERS, endpoints } from "@/constants/endpoint.constant";

import { checkAuth } from "@/server/actions/auth/checkAuth";

export async function GET(req: NextRequest) {
  try {
    const accessToken = await checkAuth();

    return await fetch(endpoints.server.v1.auth.root, {
      method: "GET",
      headers: {
        ...DEFAULT_HEADERS,
        Authorization: accessToken, // require
      },
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
