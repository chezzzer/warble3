import { env } from "@/env"

export default async function getLyricSample(isrc: string) {
    const res = await fetch(
        "https://api.musixmatch.com/ws/1.1/track.lyrics.get?" +
            new URLSearchParams({
                apikey: env.MUSIXMATCH_API_KEY,
                track_isrc: isrc,
            }).toString()
    )

    const data = await res.json()

    if (!data.message?.body?.lyrics) {
        return null
    }

    return cleanUp(data.message.body.lyrics.lyrics_body)
}

function cleanUp(sample: string): string {
    return sample.split("*******")[0]
}
