"use client"

import { Track } from "@spotify/web-api-ts-sdk"
import TrackCarousel from "../Track/TrackCarousel"
import { api } from "@/trpc/react"
import SpinnerSkeleton from "../Misc/SpinnerSkeleton"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { useEffect } from "react"

export default function RecentlyPlayed() {
    const { isPending, data } = api.spotify.getHistory.useQuery(undefined, {
        refetchInterval: 60_000,
    })

    if (isPending || !data) {
        return <SpinnerSkeleton />
    }

    return (
        <>
            <h1 className="mb-3 mt-10 px-5 text-2xl opacity-75">
                Recently Played
            </h1>
            <TrackCarousel tracks={data as Track[]} />
        </>
    )
}
