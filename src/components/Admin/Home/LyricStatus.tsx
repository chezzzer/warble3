"use client"

import Spinner from "@/components/Misc/Spinner"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { extractUri, getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import { api } from "@/trpc/react"
import { Album, Image } from "@spotify/web-api-ts-sdk"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LyricStatus() {
    const { track } = useSpotify()

    const { isPending, refetch, data } = api.lyrics.getLyricInfo.useQuery(
        {
            isrc: track?.external_ids?.isrc,
        },
        {
            enabled: false,
        }
    )

    useEffect(() => {
        if (track) refetch()
    }, [track])

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
                <CardHeader>No Lyrics Available</CardHeader>
            </Card>
        )
    }

    const stats = [
        {
            name: "Lyric Type",
            value: data.has_richsync ? (
                <Badge>RICHSYNC</Badge>
            ) : (
                <Badge>SUBTITLES</Badge>
            ),
        },
        {
            name: "ID",
            value: (
                <Link
                    href={data.track_share_url}
                    target="_blank"
                    className="underline"
                >
                    {data.track_id}
                </Link>
            ),
        },
        {
            name: "Name",
            value: data.track_name,
        },
        {
            name: "Artist",
            value: data.artist_name,
        },
        {
            name: "Album",
            value: data.album_name,
        },
    ]

    return (
        <Card>
            <CardHeader>Lyric Status</CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    {stats.map((stat) => (
                        <div key={stat.name} className="flex justify-between">
                            <div className="font-bold">{stat.name}</div>
                            <div>{stat.value}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
