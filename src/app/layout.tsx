import "@/styles/globals.css"
import { GeistSans } from "geist/font/sans"

import { type Metadata } from "next"

export const metadata: Metadata = {
    title: "WARBLE - Lyrics",
    description: "Karaoke for the whole party",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/ovu4wou.css"
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
