import Spinner from "@/components/Misc/Spinner"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { secondsToTime } from "@/lib/utils"
import { api } from "@/trpc/react"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"
import Link from "next/link"
import { useMemo, useState } from "react"

export default function NowPlaying() {
    const [progress, setProgress] = useState(0)
    const [track, setTrack] = useState<Track | null>(null)
    const [paused, setPaused] = useState<boolean>(false)

    api.player.subscribeContext.useSubscription(undefined, {
        onData: (context) => {
            setTrack(context?.item as Track | null)
            setPaused(!context?.is_playing)
        },
    })

    api.player.subscribeProgress.useSubscription(undefined, {
        onData: (progress) => {
            if (progress === null) return
            setProgress(progress)
        },
    })

    return (
        <>
            {!track && (
                <div className="flex aspect-square items-center justify-center">
                    <Spinner size={30} />
                </div>
            )}
            {!!track && (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <div className="relative">
                            <img
                                width="100%"
                                className={`animate-spin rounded-full border-[3px] border-white/0 shadow-inset-lg [animation-duration:3s] ${paused && "[animation-play-state:paused]"}`}
                                src={track.album.images[1]?.url}
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
                        <div className="flex items-center gap-5">
                            <div className="w-[80px]">
                                <Link
                                    href={track.external_urls.spotify}
                                    target="_blank"
                                >
                                    <img
                                        src={track.album.images[1]?.url}
                                        className="rounded-lg"
                                        width={80}
                                        height={80}
                                        alt={track.name}
                                    />
                                    <div className="mt-1">
                                        <img
                                            src={`https://scannables.scdn.co/uri/plain/svg/0f162a/white/640/${track.uri}`}
                                        />
                                    </div>
                                </Link>
                            </div>
                            <div className="flex-1">
                                <h6 className="text-xs font-semibold">
                                    NOW PLAYING
                                </h6>
                                <p className="text-md mt-1 font-extrabold leading-[16px]">
                                    {track.name}
                                </p>
                                <p className="text-sm leading-[16px]">
                                    {track.artists
                                        .map((a) => a.name)
                                        .join(", ")}
                                </p>
                                <p className="mt-1 text-xs">
                                    {secondsToTime(progress / 1000)} /{" "}
                                    {secondsToTime(track.duration_ms / 1000)}
                                </p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            )}
        </>
    )
}

