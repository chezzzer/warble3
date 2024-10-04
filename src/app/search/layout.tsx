import { SearchProvider } from "@/lib/Context/SearchContext"

export default function SearchLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <SearchProvider>{children}</SearchProvider>
}
