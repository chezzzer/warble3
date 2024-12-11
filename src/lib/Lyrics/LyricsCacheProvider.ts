import {
    MusixmatchLyrics,
    MusixmatchRichsync,
    MusixmatchSubtitle,
} from "musixmatch-richsync"
import musixmatch from "./LyricsProvider"
import { LyricsRedisCache } from "./LyricsRedisCache"

const lyricsRedisCache = new LyricsRedisCache()

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

export async function getLyricsFallback(
    isrc: string,
    preferredType: string | null = null
) {
    try {
        if (preferredType === musixmatch.LYRIC_TYPES.SUBTITLES) {
            throw new Error("Preferred type is subtitles")
        }

        const richsync = await getRichsyncLyrics(isrc)
        if (!richsync.richsync_body) {
            throw new Error("No richsync body found")
        }
        return consolidateLyricType(richsync.richsync_body)
    } catch {
        console.log("Falling back to subtitles")
        const subtitle = await getSubtitleLyrics(isrc)
        if (!subtitle.subtitle_body) {
            throw new Error("No subtitle body found")
        }
        return consolidateLyricType(subtitle.subtitle_body)
    }
}

export async function getLyricsDataFallback(isrc: string) {
    try {
        const richsync = await getRichsyncLyrics(isrc)
        return richsync
    } catch {
        console.log("Falling back to subtitles")
        const subtitle = await getSubtitleLyrics(isrc)
        return subtitle
    }
}

export async function getRichsyncLyrics(
    isrc: string
): Promise<MusixmatchLyrics> {
    const cacheKey = lyricsRedisCache.generateKey(
        isrc,
        musixmatch.LYRIC_TYPES.RICHSYNC
    )
    const cachedLyrics = await lyricsRedisCache.get(cacheKey)

    if (cachedLyrics) {
        return cachedLyrics
    }

    const track = await musixmatch.getRichsyncLyrics(isrc)

    await lyricsRedisCache.set(cacheKey, track)

    return track
}

export async function getSubtitleLyrics(
    isrc: string
): Promise<MusixmatchLyrics> {
    const cacheKey = lyricsRedisCache.generateKey(
        isrc,
        musixmatch.LYRIC_TYPES.SUBTITLES
    )
    const cachedLyrics = await lyricsRedisCache.get(cacheKey)

    if (cachedLyrics) {
        return cachedLyrics
    }

    const track = await musixmatch.getSubtitleLyrics(isrc)

    await lyricsRedisCache.set(cacheKey, track)

    return track
}
