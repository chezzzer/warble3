"use client"

import { Input } from "../ui/input"
import { useSearch } from "@/lib/Context/SearchContext"
import { useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchHero() {
    const color = useMemo(() => generateRandomBackground(), [])

    return (
        <>
            <div
                className={`dark relative flex h-[300px] flex-col justify-end gap-5 p-10 text-white ${color}`}
            >
                <h1 className="text-7xl font-bold drop-shadow-lg">Search</h1>
            </div>
            <div
                className={`pointer-events-none absolute z-0 h-[300px] w-full ${color} opacity-50`}
                style={{
                    maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 300px), rgba(0, 0, 0, 0) 100%)`,
                }}
            ></div>
        </>
    )
}

function generateRandomBackground(): string {
    const colors = [
        "bg-red-600",
        "bg-orange-600",
        "bg-amber-600",
        "bg-yellow-600",
        "bg-lime-600",
        "bg-green-600",
        "bg-emerald-600",
        "bg-teal-600",
        "bg-cyan-600",
        "bg-sky-600",
        "bg-blue-600",
        "bg-indigo-600",
        "bg-violet-600",
        "bg-purple-600",
        "bg-fuchsia-600",
        "bg-pink-600",
        "bg-rose-600",
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}
