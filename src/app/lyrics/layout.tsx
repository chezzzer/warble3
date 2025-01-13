import "@/styles/globals.css"

import { type Metadata } from "next"

import { TRPCReactProvider } from "@/trpc/react"
import { LyricsProvider } from "@/lib/Context/LyricsContext"
import { cn } from "@/lib/utils"
import { env } from "@/env"

export const metadata: Metadata = {
    title: "WARBLE - Lyrics",
    description: "Karaoke for the whole party",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={cn(
                "scrollbar-hide",
                env.NODE_ENV === "production" && "scrollbar-hide"
            )}
            suppressHydrationWarning={true}
        >
            <body className="overflow-x-hidden bg-slate-900">
                <TRPCReactProvider>
                    <LyricsProvider>{children}</LyricsProvider>
                </TRPCReactProvider>
            </body>
        </html>
    )
}

