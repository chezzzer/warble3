import { db } from "@/server/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic" // Forces dynamic behavior
export const revalidate = 0 // Prevents revalidation caching

export async function GET() {
    const request = await db.request.findFirst({
        where: {
            current: true,
        },
    })

    return NextResponse.json({ request: !!request })
}
