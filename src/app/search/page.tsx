import SearchHero from "@/components/Search/SearchHero"
import { unstable_cache } from "next/cache"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import SearchCategories from "@/components/Search/SearchCategories"
import SearchResults from "@/components/Search/SearchResults"
import { Suspense } from "react"

const getCategoriesCache = unstable_cache(
    async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const categories = await spotify.browse.getCategories()

        return categories.categories.items
    },
    ["searchCategories"],
    { tags: ["searchCategories"] }
)

export default async function Search() {
    const categories = await getCategoriesCache()

    return (
        <>
            <Suspense>
                <SearchHero />
            </Suspense>
            <SearchResults categories={categories} />
        </>
    )
}
