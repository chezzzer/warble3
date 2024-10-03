import Link from "next/link"

import { api, HydrateClient } from "@/trpc/server"
import HomeHero from "@/components/Explore/HomeHero"
import RecommendedTracks from "@/components/Explore/RecommendedTracks"
import FeaturedPlaylist from "@/components/Explore/FeaturedPlaylist"
import RecentlyPlayed from "@/components/Explore/RecentlyPlayed"

export const revalidate = 10

export default async function Home() {
    return (
        <HydrateClient>
            <HomeHero />
            <RecommendedTracks />
            <FeaturedPlaylist id="37i9dQZF1DX5I05jXm1F2M" />
            <FeaturedPlaylist id="37i9dQZF1EIfFu5aIsgmPg" />
            <FeaturedPlaylist id="37i9dQZF1DWY5Nosj13GLt" />
            <FeaturedPlaylist id="37i9dQZF1DX4Cwn7U4GsKm" />
            <RecentlyPlayed />
        </HydrateClient>
    )
}

