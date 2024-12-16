import "@/styles/globals.css"

import { authOptions } from "@/lib/Auth/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

import { GeistSans } from "geist/font/sans"
import { type Metadata } from "next"

import { TRPCReactProvider } from "@/trpc/react"
import { AuthProvider } from "@/lib/Context/AuthProvider"
import AdminNav from "@/components/Admin/AdminNav"
import { SpotifyProvider } from "@/lib/Context/SpotifyContext"
import { ThemeProvider } from "@/components/ThemeProvider"
import { QueueProvider } from "@/lib/Context/QueueContext"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
    title: "WARBLE - Lyrics",
    description: "Karaoke for the whole party",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return redirect("/api/auth/signin")
    }

    return (
        <html
            lang="en"
            className={`${GeistSans.variable}`}
            suppressHydrationWarning
        >
            <body className="overflow-x-hidden bg-slate-900 pb-[100px] text-white">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    storageKey="theme"
                >
                    <TRPCReactProvider>
                        <QueueProvider>
                            <SpotifyProvider>
                                <AuthProvider>
                                    <AdminNav />
                                    <div className="mx-auto max-w-7xl px-4 py-4 md:px-0">
                                        {children}
                                    </div>
                                </AuthProvider>
                            </SpotifyProvider>
                        </QueueProvider>
                    </TRPCReactProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}
