import "@/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"

import { TRPCReactProvider } from "@/trpc/react"
import { QueueProvider } from "@/lib/Context/QueueContext"
import { ThemeProvider } from "@/components/ThemeProvider"
import { SpotifyProvider } from "@/lib/Context/SpotifyContext"

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
            className={`scrollbar-hide ${GeistSans.variable}`}
            suppressHydrationWarning
        >
            <body className="overflow-x-hidden bg-slate-900">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    storageKey="theme"
                >
                    <TRPCReactProvider>
                        <SpotifyProvider>
                            <QueueProvider>{children}</QueueProvider>
                        </SpotifyProvider>
                    </TRPCReactProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
