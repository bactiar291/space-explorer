import { NextResponse } from "next/server";
import { fetchAPOD } from "@/lib/nasa-api";

export const revalidate = 86400;

export async function GET() {
  const data = await fetchAPOD();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
