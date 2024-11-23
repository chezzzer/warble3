"use client"

import QueueList from "@/components/Queue/QueueList"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import { secondsToTime } from "@/lib/utils"

export default function NowPlaying() {
    const { track, progress } = useSpotify()

    return (
        <Card>
            <CardHeader>Queue</CardHeader>
            <CardContent>
                {track ? (
                    <div className="grid grid-cols-6 items-center gap-6">
                        <div className="col-span-2">
                            <img
                                src={getLargestImage(track.album.images)?.url}
                                className="w-full rounded-lg"
                            />
                        </div>
                        <div className="col-span-4">
                            <p className="text-xl font-bold">{track.name}</p>
                            <p className="text-md">
                                {track.artists.map((a) => a.name).join(", ")}
                            </p>
                            <p className="font-bold">
                                {secondsToTime(progress / 1000)} /{" "}
                                {secondsToTime(track.duration_ms / 1000)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center">No song playing...</div>
                )}
                <hr className="my-5" />
                <QueueList />
            </CardContent>
        </Card>
    )
}
