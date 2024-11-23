"use client"

import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex h-lvh w-lvw items-center justify-center">
            <div className="text-center">
                <div className="text-7xl">404</div>
                <div className="mt-5 font-semibold">
                    <Link className="underline" href="/app">
                        Return home
                    </Link>
                </div>
            </div>
        </div>
    )
}
