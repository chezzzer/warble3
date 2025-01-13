import { createRedisClient } from "@/lib/Redis/RedisClient"
import { SpotifyPlaybackState } from "@/lib/Spotify/SpotifyPlaybackState"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { warbleLog } from "@/lib/Warble"
import { db } from "@/server/db"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"

const spotifyPlaybackState = new SpotifyPlaybackState()

let currentlyPlayingId: string | null = null

const subscriber = createRedisClient()

await subscriber.connect()

let volume_cache: number | null = await getNormalVolume()
let karaoke_volume_cache: number | null = await getKaraokeVolume()

await subscriber.subscribe(
    "setting.update.lyrics.karaoke_volume",
    async (message) => {
        karaoke_volume_cache = Number(message)

        const firstInQueue = await db.request.findFirst({
            where: {
                current: true,
            },
        })

        if (!firstInQueue) return

        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        await spotify.player.setPlaybackVolume(Number(message))
    }
)

await subscriber.subscribe("setting.update.lyrics.volume", async (message) => {
    volume_cache = Number(message)

    const firstInQueue = await db.request.findFirst({
        where: {
            current: true,
        },
    })

    if (firstInQueue) return

    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    await spotify.player.setPlaybackVolume(Number(message))
})

export default async function setVolume() {
    const context = await spotifyPlaybackState.get()

    if (!context) {
        return
    }

    if (!context || !context.item) {
        return
    }

    if (currentlyPlayingId !== context.item.id) {
        currentlyPlayingId = context.item.id

        const firstInQueue = await db.request.findFirst()

        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const track = context.item as Track
        warbleLog(
            `🎵 Now playing ${track.name} - ${track.artists.map((artist) => artist.name).join(", ")}`
        )

        if (firstInQueue?.spotifyId === context.item.id) {
            warbleLog("Setting volume to karaoke")
            if (karaoke_volume_cache) {
                await spotify.player.setPlaybackVolume(karaoke_volume_cache)
            }
        } else {
            warbleLog("Setting volume to normal")
            if (volume_cache) {
                await spotify.player.setPlaybackVolume(volume_cache)
            }
        }
    }
}

async function getKaraokeVolume(): Promise<number | null> {
    const volume = await db.settings.findFirst({
        where: {
            name: "lyrics.karaoke_volume",
        },
    })

    if (!volume) {
        return null
    }

    return Number.parseInt(volume.value)
}

async function getNormalVolume(): Promise<number | null> {
    const volume = await db.settings.findFirst({
        where: {
            name: "lyrics.volume",
        },
    })

    if (!volume) {
        return null
    }

    return Number.parseInt(volume.value)
}
