"use client"

import {
    Compass,
    House,
    MagnifyingGlass,
    MicrophoneStage,
} from "@phosphor-icons/react"
import Link from "next/link"
import NowPlaying from "./NowPlaying"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar() {
    const items = [
        {
            name: "Explore",
            href: "/",
            icon: Compass,
        },
        {
            name: "Search",
            href: "/search",
            icon: MagnifyingGlass,
        },
    ]

    const pathname = usePathname()

    return (
        <div className="relative z-50 h-screen w-[80px] min-w-[80px]">
            <div className="fixed h-full w-[80px] border-r-[1px] border-slate-800 bg-slate-900">
                <div className="flex h-full flex-col items-center justify-between gap-10 p-2 pt-5">
                    <div>
                        <MicrophoneStage size={50} weight="duotone" />
                    </div>
                    <div className="flex w-full flex-col items-center gap-10">
                        {items.map((item) => (
                            <div key={item.href}>
                                <div className="sr-only">{item.name}</div>
                                <Link href={item.href}>
                                    <item.icon
                                        size={30}
                                        weight={
                                            pathname === item.href
                                                ? "fill"
                                                : "regular"
                                        }
                                    />
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="w-full">
                        <NowPlaying />
                    </div>
                </div>
            </div>
        </div>
    )
}

