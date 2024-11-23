import "@/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"

import { TRPCReactProvider } from "@/trpc/react"
import { LyricsProvider } from "@/lib/Context/LyricsContext"

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
            className={`${GeistSans.variable} scrollbar-hide`}
            suppressHydrationWarning
        >
            <body className="overflow-x-hidden bg-slate-900">
                <TRPCReactProvider>
                    <LyricsProvider>{children}</LyricsProvider>
                </TRPCReactProvider>
            </body>
        </html>
    )
}

