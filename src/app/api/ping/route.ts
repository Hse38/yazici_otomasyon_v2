import { NextResponse } from "next/server";

/** Minimal health route — if this returns JSON, traffic reached this deployment. */
export function GET() {
  return NextResponse.json({ ok: true, t: Date.now() });
}
