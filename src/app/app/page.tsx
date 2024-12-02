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

export const revalidate = 10

export default async function Home() {
    return (
        <>
            <Suspense fallback={<HomeHeroLoader />}>
                <HomeHero />
            </Suspense>
            <Suspense fallback={<TrackCarouselLoader />}>
                <PopularArtists />
            </Suspense>
            <Suspense fallback={<TrackCarouselLoader />}>
                <FeaturedPlaylist id="37i9dQZF1DX5I05jXm1F2M" />
            </Suspense>
            <Suspense fallback={<TrackCarouselLoader />}>
                <FeaturedPlaylist id="37i9dQZF1EIfFu5aIsgmPg" />
            </Suspense>
            <Suspense fallback={<TrackCarouselLoader />}>
                <FeaturedPlaylist id="37i9dQZF1DWY5Nosj13GLt" />
            </Suspense>
            <Suspense fallback={<TrackCarouselLoader />}>
                <FeaturedPlaylist id="37i9dQZF1DX4Cwn7U4GsKm" />
            </Suspense>
            <RecentlyPlayed />
        </>
    )
}
