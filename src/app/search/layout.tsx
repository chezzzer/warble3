import { SearchProvider } from "@/lib/Context/SearchContext"
import type { Metadata } from "next/types"

export const metadata: Metadata = {
    title: "WARBLE - Search",
    description: "Search for artists, albums, tracks, playlists",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <SearchProvider>{children}</SearchProvider>
}
