"use client"

import {
    Compass,
    House,
    MagnifyingGlass,
    MicrophoneStage,
    MusicNote,
    SpotifyLogo,
} from "@phosphor-icons/react"
import Link from "next/link"
import NowPlaying from "./NowPlaying"
import { usePathname, useRouter } from "next/navigation"
import Queue from "../../Queue/Queue"
import ThemeSelector from "../ThemeSelector"
import Time from "../Time"
import HistoryNavigation from "../HistoryNavigation"
import Search from "./Search"

export default function Navbar() {
    const items = [
        {
            name: "Explore",
            href: "/app",
            icon: Compass,
        },
        {
            name: "Search",
            href: "/app/search",
            icon: MagnifyingGlass,
        },
    ]

    const pathname = usePathname()

    return (
        <>
            <div
                className="pointer-events-none fixed left-0 top-0 z-10 h-[200px] w-full bg-[#020617d7] backdrop-blur-md"
                style={{
                    maskImage: `linear-gradient(to bottom, #000, transparent)`,
                }}
            ></div>
            <div className="fixed left-[110px] top-[30px] z-10">
                <HistoryNavigation />
            </div>
            <div className="fixed left-[110px] right-[30px] top-[90px] z-10 [margin-inline:auto] md:top-[30px] md:w-[400px]">
                <Search />
            </div>
            <div className="fixed right-[30px] top-[30px] z-10 flex items-center gap-5">
                <Time />
                <ThemeSelector />
            </div>
            <div className="fixed z-50 h-screen w-[80px] border-r-[1px] border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex h-full flex-col items-center justify-between gap-10 p-2 pt-5">
                    <div>
                        <Link href="/">
                            <MicrophoneStage size={50} weight="duotone" />
                        </Link>
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
                        <Queue />
                        <NowPlaying />
                    </div>
                </div>
            </div>
        </>
    )
}
