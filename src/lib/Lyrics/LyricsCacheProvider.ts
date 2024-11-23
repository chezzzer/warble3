import {
    MusixmatchLyrics,
    MusixmatchRichsync,
    MusixmatchSubtitle,
} from "musixmatch-richsync"
import musixmatch from "./LyricsProvider"
import { db } from "@/server/db"

export type LyricLine = {
    start: number
    end: number | null
    text: string
}

function consolidateLyricType(
    lyrics: MusixmatchRichsync[] | MusixmatchSubtitle[]
): LyricLine[] {
    const richsync = lyrics as MusixmatchRichsync[]
    if (richsync[0].end) {
        return richsync.map((lyric) => ({
            start: lyric.start,
            end: lyric.end,
            text: lyric.text,
        }))
    }
    const subtitles = lyrics as MusixmatchSubtitle[]
    return subtitles.map((subtitle) => ({
        start: subtitle.time.total,
        end: null,
        text: subtitle.text,
    }))
}

export async function getLyricsFallback(isrc: string) {
    try {
        const richsync = await getRichsyncLyrics(isrc)
        return consolidateLyricType(richsync.richsync_body)
    } catch {
        console.log("Falling back to subtitles")
        const subtitle = await getSubtitleLyrics(isrc)
        return consolidateLyricType(subtitle.subtitle_body)
    }
}

export async function getRichsyncLyrics(
    isrc: string
): Promise<MusixmatchLyrics> {
    const cachedLyrics = await db.lyricCache.findFirst({
        where: {
            type: musixmatch.LYRIC_TYPES.RICHSYNC,
            isrc,
        },
    })

    if (cachedLyrics) {
        return JSON.parse(cachedLyrics.lyrics_json) as MusixmatchLyrics
    }

    const track = await musixmatch.getRichsyncLyrics(isrc)

    await db.lyricCache.create({
        data: {
            isrc,
            lyrics_json: JSON.stringify(track),
            type: musixmatch.LYRIC_TYPES.RICHSYNC,
        },
    })

    return track
}

export async function getSubtitleLyrics(
    isrc: string
): Promise<MusixmatchLyrics> {
    const cachedLyrics = await db.lyricCache.findFirst({
        where: {
            type: musixmatch.LYRIC_TYPES.SUBTITLES,
            isrc,
        },
    })

    if (cachedLyrics) {
        return JSON.parse(cachedLyrics.lyrics_json) as MusixmatchLyrics
    }

    const track = await musixmatch.getSubtitleLyrics(isrc)

    await db.lyricCache.create({
        data: {
            isrc,
            lyrics_json: JSON.stringify(track),
            type: musixmatch.LYRIC_TYPES.SUBTITLES,
        },
    })

    return track
}
