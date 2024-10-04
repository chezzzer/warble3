"use client"

import type { SimplifiedAlbum, Track } from "@spotify/web-api-ts-sdk"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"

export default function Album({ album }: { album: SimplifiedAlbum }) {
    return (
        <>
            <Link href={`/album/${album.id}`}>
                <Card className="cursor-pointer transition-colors hover:bg-slate-900/70">
                    <CardHeader>
                        <img
                            src={getLargestImage(album.images)?.url}
                            className="aspect-square rounded-lg object-cover"
                            alt={album.name}
                        />
                    </CardHeader>
                    <CardContent>
                        <p className="text-md overflow-hidden whitespace-nowrap font-semibold">
                            {album.name}
                        </p>
                        <p className="overflow-hidden whitespace-nowrap text-sm capitalize text-gray-400">
                            {new Date(album.release_date).getFullYear()}{" "}
                            &middot; {album.album_type}
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}
