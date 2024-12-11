import { SpotifyPlaybackState } from "@/lib/Spotify/SpotifyPlaybackState"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { warbleLog } from "@/lib/Warble"
import { db } from "@/server/db"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"

const spotifyPlaybackState = new SpotifyPlaybackState()

let currentlyPlayingId: string | null = null

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
            const volume = await db.settings.findFirst({
                where: {
                    name: "lyrics.karaoke_volume",
                },
            })
            if (volume) {
                await spotify.player.setPlaybackVolume(
                    Number.parseInt(volume.value)
                )
            }
        } else {
            warbleLog("Setting volume to normal")
            const volume = await db.settings.findFirst({
                where: {
                    name: "lyrics.volume",
                },
            })
            if (volume) {
                await spotify.player.setPlaybackVolume(
                    Number.parseInt(volume.value)
                )
            }
        }

        // Reset sync
        await db.settings.upsert({
            where: {
                name: "lyrics.karaoke_sync",
            },
            update: {
                value: "0",
            },
            create: {
                name: "lyrics.karaoke_sync",
                value: "0",
            },
        })
    }
}
