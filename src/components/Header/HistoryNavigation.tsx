"use client"

import {
    ArrowFatLeft,
    ArrowLeft,
    CaretLeft,
    CaretRight,
    LessThan,
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

export default function HistoryNavigation() {
    const router = useRouter()

    return (
        <div className="flex items-center gap-3">
            <div
                onClick={() => router.back()}
                className="cursor-pointer rounded-full bg-white p-2 text-slate-900 shadow-lg transition-colors dark:bg-slate-900 dark:text-white"
            >
                <CaretLeft size={23} />
            </div>
            <div
                onClick={() => router.forward()}
                className="cursor-pointer rounded-full bg-white p-2 text-slate-900 shadow-lg transition-colors dark:bg-slate-900 dark:text-white"
            >
                <CaretRight size={23} />
            </div>
        </div>
    )
}
