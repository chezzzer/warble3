"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const items = [
        {
            name: "Karaoke",
            href: "/admin/settings/karaoke",
        },
        {
            name: "Lyrics",
            href: "/admin/settings/lyrics",
        },
        {
            name: "Home Layout",
            href: "/admin/settings/home-layout",
        },
    ]

    const pathname = usePathname()

    return (
        <>
            <div className="flex flex-col gap-5 md:flex-row">
                <div className="md:w-[300px]">
                    <Card>
                        <CardHeader>
                            <h1 className="text-xl font-bold">Settings</h1>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-3">
                                {items.map((item) => (
                                    <div key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "hover:underline",
                                                pathname === item.href &&
                                                    "font-bold"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </>
    )
}
