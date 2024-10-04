"use client"

import type { Artist, SimplifiedAlbum, Track } from "@spotify/web-api-ts-sdk"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"

export default function Artist({ artist }: { artist: Artist }) {
    return (
        <>
            <Link href={`/artist/${artist.id}`}>
                <Card className="cursor-pointer transition-colors hover:bg-slate-900/70">
                    <CardHeader>
                        <img
                            src={artist.images[1]?.url}
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
