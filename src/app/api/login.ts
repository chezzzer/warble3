import { env } from "@/env"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const body = await req.json()

    if (body.password !== env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    return NextResponse.json({}, { status: 204 })
}
