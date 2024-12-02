"use client"

import { Warning } from "@phosphor-icons/react"
import { ReactNode } from "react"

export default function InLineError({ error }: { error: ReactNode }) {
    return (
        <div className="flex items-center gap-3 px-5 pt-5 text-red-500">
            <Warning /> {error}
        </div>
    )
}
