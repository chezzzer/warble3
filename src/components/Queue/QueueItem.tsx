import Link from "next/link"
import ArtistList from "../Artist/ArtistList"
import type { RequestItem } from "@/server/api/routers/request"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { secondsToTime } from "@/lib/utils"
import { getSmallestImage } from "@/lib/Spotify/SpotifyUtils"
import { Badge } from "../ui/badge"

export default function QueueItem({
    request,
    playingIn,
}: {
    request: RequestItem
    playingIn?: number
}) {
    return (
        <div className="flex items-center gap-3">
            <div>
                <Link href={`/album/${request.track.album.id}`}>
                    <img
                        alt={request.track.name}
                        src={getSmallestImage(request.track.album.images).url}
                        width={75}
                        height={75}
                        className="rounded-lg shadow-lg"
                    />
                </Link>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <div>{request.name} is singing</div>
                    {playingIn && (
                        <Badge
                            variant={
                                playingIn <= 30 ? "destructive" : "default"
                            }
                        >
                            {secondsToTime(playingIn)}
                        </Badge>
                    )}
                </div>
                <p className="mt-1 text-lg font-bold leading-[20px]">
                    {request.track.name}
                </p>
                <p className="leading-[20px] opacity-75">
                    <ArtistList artists={request.track.artists} />
                </p>
            </div>
        </div>
    )
}
