"use client"

import { useEffect } from "react"
import User from "./User"
import { api } from "@/trpc/react"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NowPlaying from "../Header/Nav/NowPlaying"
import { ArrowUpRight } from "@phosphor-icons/react"

export default function AdminNav() {
    const items = [
        { name: "Home", url: "/admin" },
        { name: "Settings", url: "/admin/settings" },
        { name: "Open Lyrics", url: "/lyrics", external: true },
        { name: "Open Queue", url: "/queue", external: true },
        { name: "Back to App", url: "/app" },
    ]

    const pathname = usePathname()

    return (
        <nav className="border-b bg-slate-950 px-4 pt-20">
            <div className="mx-auto max-w-7xl py-4">
                <div className="flex justify-between gap-4">
                    <div>
                        <h1 className="mb-5 text-4xl font-bold">
                            Warble Admin
                        </h1>
                        <div className="flex flex-col gap-3 md:flex-row">
                            {items.map((item) => (
                                <Link
                                    href={item.url}
                                    target={!item.external ? "_self" : "_blank"}
                                    key={item.name}
                                >
                                    <Button
                                        variant={
                                            pathname === item.url
                                                ? "secondary"
                                                : "link"
                                        }
                                    >
                                        {item.name}
                                        {item.external && (
                                            <ArrowUpRight className="ms-2" />
                                        )}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-10">
                        <div className="w-[60px]">
                            <NowPlaying />
                        </div>
                        <User />
                    </div>
                </div>
            </div>
        </nav>
    )
}
