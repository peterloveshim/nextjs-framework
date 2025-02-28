import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    return new NextResponse(JSON.stringify({ response: "ok" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    const message = err.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
