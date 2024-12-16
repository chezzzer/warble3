import Link from "next/link"

import { api, HydrateClient } from "@/trpc/server"
import HomeHero from "@/components/Explore/HomeHero"
import RecommendedTracks from "@/components/Explore/RecommendedTracks"
import FeaturedPlaylist from "@/components/Explore/FeaturedPlaylist"
import RecentlyPlayed from "@/components/Explore/RecentlyPlayed"
import { Suspense } from "react"
import HomeHeroLoader from "@/components/Explore/HomeHeroLoader"
import TrackCarouselLoader from "@/components/Track/TrackCarouselLoader"
import PopularArtists from "@/components/Explore/PopularArtists"
import { db } from "@/server/db"
import { unstable_cache } from "next/cache"
import NewReleases from "@/components/Explore/NewReleases"
import PopularReleases from "@/components/Explore/PopularReleases"

export const revalidate = 10

const getLayoutCache = unstable_cache(
    async () => {
        const layouts = await db.layout.findMany({
            where: {
                name: "home",
            },
        })

        return layouts
    },
    ["homeLayout"],
    { tags: ["homeLayout"] }
)

export default async function Home() {
    const layout = await getLayoutCache()

    return layout.map((layout, i) => {
        if (layout.row_type === "playlist") {
            const data = JSON.parse(layout.row_data)
            return (
                <Suspense key={i} fallback={<TrackCarouselLoader />}>
                    <FeaturedPlaylist id={data.playlist_id} />
                </Suspense>
            )
        }

        if (layout.row_type === "popular-artists") {
            return (
                <Suspense key={i} fallback={<TrackCarouselLoader />}>
                    <PopularArtists />
                </Suspense>
            )
        }

        if (layout.row_type === "recently-played") {
            return <RecentlyPlayed key={i} />
        }

        if (layout.row_type === "random-artist") {
            return (
                <Suspense key={i} fallback={<HomeHeroLoader />}>
                    <HomeHero />
                </Suspense>
            )
        }

        if (layout.row_type === "new-releases") {
            return (
                <Suspense key={i} fallback={<TrackCarouselLoader />}>
                    <NewReleases />
                </Suspense>
            )
        }

        if (layout.row_type === "popular-releases") {
            return (
                <Suspense key={i} fallback={<TrackCarouselLoader />}>
                    <PopularReleases />
                </Suspense>
            )
        }
    })
}
