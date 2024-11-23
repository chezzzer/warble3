"use client"

import LyricList from "@/components/Lyrics/LyricList"
import LyricLoader from "@/components/Lyrics/LyricLoader"
import LyricMask from "@/components/Lyrics/LyricMask"
import LyricTrackDisplay from "@/components/Lyrics/LyricTrackDisplay"
import LyricStatusBar from "@/components/Lyrics/LyricStatusBar"
import { useLyrics } from "@/lib/Context/LyricsContext"

export default function Lyrics() {
    const { lyrics } = useLyrics()

    if (lyrics === undefined) {
        return <LyricLoader />
    }

    if (lyrics === null) {
        return <LyricTrackDisplay />
    }

    return (
        <>
            <LyricStatusBar />
            <LyricMask />
            <LyricList />
        </>
    )
}
