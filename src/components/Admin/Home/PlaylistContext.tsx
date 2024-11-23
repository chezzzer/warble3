"use client"

import Spinner from "@/components/Misc/Spinner"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { extractUri, getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import { api } from "@/trpc/react"
import { Album, Image } from "@spotify/web-api-ts-sdk"
import { useEffect, useState } from "react"

export default function PlaylistContext() {
    const { context } = useSpotify()

    const { isPending, refetch, data } = api.player.getContextItem.useQuery()

    useEffect(() => {
        refetch()
    }, [context])

    if (isPending) {
        return (
            <Card>
                <CardHeader>
                    <Spinner />
                </CardHeader>
            </Card>
        )
    }

    if (!data) {
        return (
            <Card>
                <CardHeader>No Playlist</CardHeader>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>Non Request Source</CardHeader>
            <CardContent>
                <div className="grid grid-cols-6 items-center gap-6">
                    <div className="col-span-2">
                        <img
                            src={getLargestImage(data.images as Image[])?.url}
                            className="w-full rounded-lg"
                        />
                    </div>
                    <div className="col-span-4">
                        <p className="text-xl font-bold">{data.name}</p>
                        <p className="text-md">{data.owner.display_name}</p>
                        <p className="text-md">{data.tracks.total} Tracks</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
