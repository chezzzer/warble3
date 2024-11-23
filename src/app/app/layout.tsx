import "@/styles/globals.css"

import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"

import { TRPCReactProvider } from "@/trpc/react"
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/Header/Nav/Navbar"
import { SpotifyProvider } from "@/lib/Context/SpotifyContext"
import Footer from "@/components/Footer/Footer"
import { QueueProvider } from "@/lib/Context/QueueContext"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
    title: "WARBLE - Discover",
    description: "Karaoke for the whole party",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`${GeistSans.variable}`}
            suppressHydrationWarning
        >
            <body className="overflow-x-hidden bg-slate-200 antialiased transition-colors duration-300 dark:bg-slate-950">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    storageKey="theme"
                >
                    <TRPCReactProvider>
                        <SpotifyProvider>
                            <QueueProvider>
                                <Navbar />
                                <main className="relative pl-[80px]">
                                    {children}
                                    <Footer />
                                </main>
                            </QueueProvider>
                        </SpotifyProvider>
                    </TRPCReactProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
