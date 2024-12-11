"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
} from "@/components/ui/sidebar"

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
                        <CardContent>
                            <SidebarProvider>
                                <SidebarMenu className="my-5">
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            data-active={
                                                pathname === "/admin/settings"
                                            }
                                        >
                                            <Link href="/admin/settings">
                                                Settings
                                            </Link>
                                        </SidebarMenuButton>
                                        <SidebarMenuSub>
                                            {items.map((item) => (
                                                <SidebarMenuSubItem
                                                    key={item.name}
                                                >
                                                    <SidebarMenuSubButton
                                                        data-active={
                                                            pathname ===
                                                            item.href
                                                        }
                                                        asChild
                                                    >
                                                        <Link href={item.href}>
                                                            {item.name}
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarProvider>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </>
    )
}
