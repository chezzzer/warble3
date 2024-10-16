"use client"

import type { Artist, SimplifiedAlbum, Track } from "@spotify/web-api-ts-sdk"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"

export default function Artist({ artist }: { artist: Artist }) {
    return (
        <>
            <Link href={`/artist/${artist.id}`}>
                <Card className="cursor-pointer transition-colors dark:hover:bg-slate-900/70">
                    <CardHeader>
                        <img
                            src={getLargestImage(artist.images)?.url}
                            className="aspect-square rounded-full object-cover"
                            alt={artist.name}
                        />
                    </CardHeader>
                    <CardContent>
                        <p className="text-md overflow-hidden whitespace-nowrap font-semibold">
                            {artist.name}
                        </p>
                        <p className="overflow-hidden whitespace-nowrap text-sm capitalize text-gray-400">
                            Artist
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}
