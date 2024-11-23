"use client"

import useImageColor from "@/hooks/useImageColor"
import { useLyrics } from "@/lib/Context/LyricsContext"
import { rgbaToHex } from "@/lib/Misc/ColorHelper"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import { cn } from "@/lib/utils"
import { SmileySad } from "@phosphor-icons/react"
import { useEffect, useMemo, useState } from "react"

export default function LyricTrackDisplay() {
    const { track } = useLyrics()

    const { color, onLoad, luminance } = useImageColor(1, false)

    if (!track) {
        return (
            <div className="flex h-lvh items-center justify-center text-white">
                <h1 className="text-4xl font-bold">No song playing...</h1>
            </div>
        )
    }

    return (
        <div style={{ background: color }}>
            <div
                className={cn(
                    luminance > 0.5 ? "text-black" : "text-white",
                    "mx-auto flex h-lvh max-w-7xl items-center"
                )}
            >
                <div className="grid grid-cols-2 items-center gap-14">
                    <div>
                        <img
                            src={getLargestImage(track.album.images)?.url}
                            className="h-full rounded-lg object-cover"
                            onLoad={onLoad}
                            crossOrigin="anonymous"
                        />
                    </div>
                    <div>
                        <div className="flex flex-col gap-5">
                            <div className="text-6xl font-bold">
                                {track.name}
                            </div>
                            <div className="text-2xl opacity-75">
                                {track.artists.map((a) => a.name).join(", ")}
                            </div>
                            <div>
                                <img
                                    src={`https://scannables.scdn.co/uri/plain/svg/${color ? rgbaToHex(color).replace("#", "") : "0f172a"}/${luminance > 0.5 ? "black" : "white"}/640/spotify:track:${track.id}`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
