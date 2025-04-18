import ArtistList from "@/components/Artist/ArtistList"
import Spinner from "@/components/Misc/Spinner"
import CurrentTrack from "@/components/Player/CurrentTrack"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { getSmallestImage } from "@/lib/Spotify/SpotifyUtils"
import { secondsToTime } from "@/lib/utils"
import Link from "next/link"

export default function NowPlaying() {
    const { track, paused, progress } = useSpotify()

    return (
        <>
            {track === undefined && (
                <div className="flex aspect-square items-center justify-center">
                    <Spinner size={30} />
                </div>
            )}
            {track && (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="relative">
                            <img
                                alt={track.name}
                                width="100%"
                                className={`animate-spin rounded-full border-[3px] border-white/0 shadow-inset-lg [animation-duration:3s] ${paused && "[animation-play-state:paused]"}`}
                                src={getSmallestImage(track.album.images)?.url}
                            />
                            <div className="absolute left-0 top-0 h-full w-full">
                                <svg
                                    className="size-full -rotate-90"
                                    viewBox="0 0 36 36"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        fill="none"
                                        className="stroke-current text-slate-500/50"
                                        strokeWidth="1.5"
                                    ></circle>
                                    <circle
                                        cx="18"
                                        cy="18"
                                        r="16"
                                        fill="none"
                                        className="stroke-current text-slate-200"
                                        strokeWidth="1.5"
                                        strokeDasharray="100"
                                        strokeDashoffset={
                                            100 -
                                            (progress / track.duration_ms) * 100
                                        }
                                        strokeLinecap="round"
                                    ></circle>
                                </svg>
                            </div>
                        </div>
                    </HoverCardTrigger>
                    <HoverCardContent side="right" className="w-80">
                        <CurrentTrack />
                    </HoverCardContent>
                </HoverCard>
            )}
        </>
    )
}
