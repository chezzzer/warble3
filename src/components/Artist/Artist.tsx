"use client"

import type { Artist, SimplifiedAlbum, Track } from "@spotify/web-api-ts-sdk"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "../ui/avatar"

export default function Artist({ artist }: { artist: Artist }) {
    return (
        <>
            <Link href={`/app/artist/${artist.id}`}>
                <Card className="cursor-pointer transition-colors dark:hover:bg-slate-900/70">
                    <CardHeader>
                        {artist.images.length > 0 && (
                            <img
                                src={getLargestImage(artist.images)?.url}
                                className="aspect-square rounded-full object-cover"
                                alt={artist.name}
                            />
                        )}

                        {artist.images.length === 0 && (
                            <Avatar className="aspect-square h-fit w-full text-4xl">
                                <AvatarFallback>
                                    {artist.name.toUpperCase().substring(0, 2)}
                                </AvatarFallback>
                            </Avatar>
                        )}
                    </CardHeader>
                    <CardContent>
                        <p className="text-md overflow-hidden whitespace-nowrap font-semibold">
                            {artist.name}
                        </p>
                        <p className="overflow-hidden whitespace-nowrap text-sm capitalize text-gray-500 dark:text-gray-400">
                            Artist
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}
