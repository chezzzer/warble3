"use client"

import { useSpotify } from "@/lib/Context/SpotifyContext"
import { getLargestImage, getSmallestImage } from "@/lib/Spotify/SpotifyUtils"
import { cn, secondsToTime } from "@/lib/utils"
import ArtistList from "../Artist/ArtistList"
import Link from "next/link"
import { useQueue } from "@/lib/Context/QueueContext"
import { Microphone, MicrophoneStage } from "@phosphor-icons/react"
import { MicrophoneSlash } from "@phosphor-icons/react/dist/ssr"

export default function CurrentTrack({ display }: { display?: boolean }) {
    const { track, progress } = useSpotify()
    const { singer } = useQueue()

    if (!track) {
        return null
    }

    return (
        <div
            className={cn(
                "flex items-center",
                display ? "w-[600px] gap-10" : "gap-3"
            )}
        >
            <div className={display ? "w-[200px]" : "w-[80px]"}>
                <Link href={"/app/album/" + track.album.id}>
                    <img
                        src={
                            (display
                                ? getLargestImage(track.album.images)
                                : getSmallestImage(track.album.images)
                            )?.url
                        }
                        className="rounded-lg object-cover"
                        width={"100%"}
                        height={"100%"}
                        alt={track.name}
                    />
                    <div className="mt-1">
                        <img
                            alt={track.name}
                            src={`https://scannables.scdn.co/uri/plain/svg/020817/white/640/${track.uri}`}
                        />
                    </div>
                </Link>
            </div>
            <div className="flex-1">
                <h6
                    className={cn(
                        "font-semibold",
                        display ? "text-md" : "text-xs"
                    )}
                >
                    NOW PLAYING
                </h6>
                {singer && display && (
                    <div className="mb-1 mt-3 flex items-center gap-2 text-2xl">
                        <MicrophoneStage weight="fill" size={30} /> {singer}
                    </div>
                )}

                <p
                    className={cn(
                        "mt-1 font-extrabold leading-[16px]",
                        display ? "text-3xl" : "text-lg"
                    )}
                >
                    {track.name}
                </p>
                <p
                    className={cn(
                        "leading-[16px]",
                        display ? "text-xl" : "text-md"
                    )}
                >
                    <ArtistList underline={!display} artists={track.artists} />
                </p>
                <p className={cn("mt-1", display ? "text-lg" : "text-xs")}>
                    {secondsToTime(progress / 1000)} /{" "}
                    {secondsToTime(track.duration_ms / 1000)}
                </p>
            </div>
        </div>
    )
}
