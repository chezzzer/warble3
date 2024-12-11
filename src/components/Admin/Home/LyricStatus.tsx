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
import RangeSetting from "../Settings/RangeSetting"
import ToggleSetting from "../Settings/ToggleSetting"

export default function LyricStatus() {
    return (
        <Card>
            <CardHeader>Lyric Status</CardHeader>
            <CardContent className="flex flex-col gap-5">
                <LyricStats />
                <div>
                    <div className="flex justify-between">
                        <div>Faster</div>
                        <div>Slower</div>
                    </div>
                    <RangeSetting
                        name="lyrics.karaoke_sync"
                        initialValue={0}
                        min={-5000}
                        max={5000}
                    />
                </div>
                <div className="flex items-center gap-5">
                    <div>Subtitles</div>
                    <div>
                        <ToggleSetting
                            name="lyrics.richsync_enabled"
                            initialValue={true}
                        />
                    </div>
                    <div>Richsync</div>
                </div>
            </CardContent>
        </Card>
    )
}

function LyricStats() {
    const { track } = useSpotify()

    const { isFetching, refetch, data } = api.lyrics.getLyricInfo.useQuery(
        null,
        {
            enabled: false,
        }
    )

    useEffect(() => {
        if (track) refetch()
    }, [track])

    if (isFetching) {
        return <Spinner />
    }

    if (!data) {
        return "No Lyrics Available"
    }

    const stats = [
        {
            name: "Available Lyrics",
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
        <div className="flex flex-col gap-4">
            {stats.map((stat) => (
                <div key={stat.name} className="flex justify-between">
                    <div className="font-bold">{stat.name}</div>
                    <div>{stat.value}</div>
                </div>
            ))}
        </div>
    )
}
