import { useLyrics } from "@/lib/Context/LyricsContext"
import type { LyricLine } from "@/lib/Lyrics/LyricsCacheProvider"
import { MusixmatchRichsync, MusixmatchSubtitle } from "musixmatch-richsync"
import { useEffect, useMemo } from "react"

export default function LineCountdown({ line }: { line: LyricLine }) {
    const { progress, lyrics, currentIndex } = useLyrics()

    const total = useMemo(() => {
        return line.start - progress / 1000
    }, [currentIndex, lyrics])

    if (!lyrics) {
        return null
    }

    if (!lyrics[currentIndex + 1]) {
        return null
    }

    const time = line.start - progress / 1000

    if (time < 0) {
        return null
    }

    return (
        <div className="absolute -left-[60px] bottom-0 top-0 z-0 h-[50px] w-[50px]">
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
                    className="stroke-current text-blue-500/25 transition-all ease-linear"
                    strokeWidth="3"
                ></circle>
                <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    className="stroke-current text-blue-500 transition-all ease-linear"
                    strokeWidth="3"
                    strokeDasharray="100"
                    strokeDashoffset={100 - (time / total) * 100}
                    strokeLinecap="round"
                ></circle>
            </svg>
        </div>
    )
}
