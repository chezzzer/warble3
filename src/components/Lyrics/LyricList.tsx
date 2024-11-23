import { useLyrics } from "@/lib/Context/LyricsContext"
import {
    MusixmatchLyric,
    MusixmatchRichsync,
    MusixmatchSubtitle,
} from "musixmatch-richsync"
import { useEffect } from "react"
import LineCountdown from "./LineCountdown"
import type { LyricLine } from "@/lib/Lyrics/LyricsCacheProvider"

export default function LyricList() {
    const { lyrics, currentIndex } = useLyrics()

    useEffect(() => {
        if (currentIndex === null) return
        document
            .querySelector(`[data-index="${currentIndex}"]`)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })

        const adjust = setTimeout(() => {
            document
                .querySelector(`[data-index="${currentIndex}"]`)
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                })
        }, 500)

        return () => clearTimeout(adjust)
    }, [currentIndex])

    useEffect(() => {
        document.body.scrollIntoView({
            behavior: "instant",
            block: "center",
        })

        if (currentIndex) {
            document
                .querySelector(`[data-index="${currentIndex}"]`)
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                })
        }
    }, [lyrics])

    if (!lyrics) {
        return null
    }

    return (
        <div className="flex h-lvh w-lvw items-center justify-center text-white">
            <div className="h-full max-h-[75%] w-full max-w-[75%]">
                <div className="flex flex-col gap-[100px] py-[500px]">
                    {lyrics.map((lyric, i) => (
                        <Lyric
                            key={i}
                            line={lyric}
                            current={i === currentIndex}
                            next={i === currentIndex + 1}
                            index={i}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function Lyric({
    line,
    current,
    next,
    index,
}: {
    line: LyricLine
    current: boolean
    next: boolean
    index: number
}) {
    const { currentIndex } = useLyrics()

    return (
        <div
            data-index={index}
            className={`${currentIndex === index ? "opacity-100" : currentIndex >= index ? "opacity-75" : "opacity-50"} relative text-7xl transition-all duration-500 ${current ? "font-bold" : "font-medium"}`}
        >
            {line.text || " "}
            {next && line.text.trim() && <LineCountdown line={line} />}
        </div>
    )
}
