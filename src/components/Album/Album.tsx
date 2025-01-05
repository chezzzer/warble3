"use client"

import type { Album, SimplifiedAlbum, Track } from "@spotify/web-api-ts-sdk"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"

export default function Album({ album }: { album: SimplifiedAlbum | Album }) {
    return (
        <>
            <Link href={`/app/album/${album.id}`}>
                <Card className="cursor-pointer transition-colors dark:hover:bg-slate-900/70">
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
                        <p className="overflow-hidden whitespace-nowrap text-sm capitalize text-gray-500 dark:text-gray-400">
                            {album.artists?.map((a) => a.name).join(", ") ||
                                "Album"}{" "}
                            &middot;{" "}
                            {new Date(album.release_date).getFullYear()}
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}
