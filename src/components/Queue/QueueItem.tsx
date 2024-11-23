import Link from "next/link"
import ArtistList from "../Artist/ArtistList"
import type { RequestItem } from "@/server/api/routers/request"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { cn, secondsToTime } from "@/lib/utils"
import { getLargestImage, getSmallestImage } from "@/lib/Spotify/SpotifyUtils"
import { Badge } from "../ui/badge"

export default function QueueItem({
    request,
    playingIn,
    display,
}: {
    request: RequestItem
    playingIn?: number
    display?: boolean
}) {
    return (
        <div className={cn("flex items-center", display ? "gap-10" : "gap-3")}>
            <div>
                <Link href={`/app/album/${request.track.album.id}`}>
                    <img
                        alt={request.track.name}
                        src={
                            (display
                                ? getLargestImage(request.track.album.images)
                                : getSmallestImage(request.track.album.images)
                            ).url
                        }
                        width={display ? 200 : 75}
                        height={display ? 200 : 75}
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
                <p
                    className={cn(
                        display ? "text-3xl" : "text-lg",
                        "mt-1 font-bold"
                    )}
                >
                    {request.track.name}
                </p>
                <p className={cn(display && "text-2xl", "opacity-75")}>
                    <ArtistList artists={request.track.artists} />
                </p>
            </div>
        </div>
    )
}
