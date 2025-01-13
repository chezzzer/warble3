import "@/styles/globals.css"

import { type Metadata } from "next"

import { TRPCReactProvider } from "@/trpc/react"
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/Header/Nav/Navbar"
import { SpotifyProvider } from "@/lib/Context/SpotifyContext"
import Footer from "@/components/Footer/Footer"
import { QueueProvider } from "@/lib/Context/QueueContext"
import { Toaster } from "@/components/ui/sonner"
import { SearchProvider } from "@/lib/Context/SearchContext"
import { AppProvider } from "@/lib/Context/AppContext"
import { db } from "@/server/db"

export const metadata: Metadata = {
    title: "WARBLE - Discover",
    description: "Karaoke for the whole party",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const timeout = await db.settings.findFirst({
        where: {
            name: "app.timeout",
        },
    })

    return (
        <html lang="en" suppressHydrationWarning={true}>
            <body
                suppressHydrationWarning={true}
                className="overflow-x-hidden bg-slate-200 antialiased transition-colors duration-300 dark:bg-slate-950"
            >
                <TRPCReactProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        storageKey="theme"
                    >
                        <AppProvider
                            timeout={
                                timeout ? Number(timeout.value) : undefined
                            }
                        >
                            <SpotifyProvider>
                                <QueueProvider>
                                    <SearchProvider>
                                        <Navbar />
                                        <main className="relative pl-[80px]">
                                            {children}
                                            <Footer />
                                        </main>
                                    </SearchProvider>
                                </QueueProvider>
                            </SpotifyProvider>
                        </AppProvider>
                    </ThemeProvider>
                </TRPCReactProvider>
                <Toaster />
            </body>
        </html>
    )
}
