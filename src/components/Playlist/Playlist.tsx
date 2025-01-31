"use client"

import type {
    Playlist,
    SimplifiedAlbum,
    SimplifiedPlaylist,
    Track,
} from "@spotify/web-api-ts-sdk"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"

export default function Playlist({
    playlist,
}: {
    playlist: SimplifiedPlaylist
}) {
    return (
        <>
            <Link href={`/app/playlist/${playlist.id}`}>
                <Card className="cursor-pointer transition-colors dark:hover:bg-slate-900/70">
                    <CardHeader>
                        <img
                            src={getLargestImage(playlist.images)?.url}
                            className="aspect-square rounded-lg object-cover"
                            alt={playlist.name}
                        />
                    </CardHeader>
                    <CardContent>
                        <p className="text-md overflow-hidden whitespace-nowrap font-semibold">
                            {playlist.name}
                        </p>
                        <div className="overflow-hidden whitespace-nowrap text-sm capitalize text-gray-400">
                            Playlist{" "}
                            {playlist.tracks && (
                                <>&middot; {playlist.tracks.total} Tracks</>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}
