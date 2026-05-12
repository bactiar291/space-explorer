import { NextResponse } from "next/server";
import { fetchNEO } from "@/lib/nasa-api";

export const revalidate = 3600;

export async function GET() {
  const data = await fetchNEO();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
