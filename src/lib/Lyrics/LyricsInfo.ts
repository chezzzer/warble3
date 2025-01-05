import { env } from "@/env"

export default async function getLyricsInfo(isrc: string) {
    const res = await fetch(
        "https://api.musixmatch.com/ws/1.1/track.get?" +
            new URLSearchParams({
                apikey: env.MUSIXMATCH_API_KEY,
                track_isrc: isrc,
            }).toString()
    )

    const data = await res.json()

    return data.message?.body?.track! as MusixmatchInfo
}

export type MusixmatchInfo = {
    album_id: string
    album_name: string
    artist_id: string
    artist_name: string
    commontrack_id: string
    explicit: number
    has_lyrics: number
    has_richsync: number
    has_subtitles: number
    instrumental: number
    num_favourite: number
    restricted: number
    track_edit_url: string
    track_id: string
    track_name: string
    track_name_translation_list: string[]
    track_rating: number
    track_share_url: string
    updated_time: string
}
