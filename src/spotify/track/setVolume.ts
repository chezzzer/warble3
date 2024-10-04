import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { warbleLog } from "@/lib/Warble"
import { db } from "@/server/db"
import { PlaybackState, Track } from "@spotify/web-api-ts-sdk"

const KARAOKE_VOLUME = 100
const VOLUME = 50

let currentlyPlayingId: string | null = null

export default async function setVolume() {
    const contextJson = await db.spotifyPlaybackState.findFirst()

    if (!contextJson) {
        return
    }

    const context = JSON.parse(contextJson.state_json) as PlaybackState

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
            await spotify.player.setPlaybackVolume(KARAOKE_VOLUME)
        } else {
            warbleLog("Setting volume to normal")
            await spotify.player.setPlaybackVolume(VOLUME)
        }
    }
}
