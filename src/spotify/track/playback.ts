import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { db } from "@/server/db"
import { Track } from "@spotify/web-api-ts-sdk"

export default async function trackPlayback() {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    spotify.player
        .getPlaybackState()
        .then(async (context) => {
            if (context === null) {
                log("🎵 No song playing")
                await db.spotifyPlaybackState.deleteMany()
                return
            }
            const track = context.item as Track
            if (context.is_playing) {
                log(
                    `🎵 Now playing ${track.name} - ${track.artists.map((artist) => artist.name).join(", ")}`
                )
            } else {
                log(
                    `🎵 Paused on ${track.name} - ${track.artists.map((artist) => artist.name).join(", ")}`
                )
            }

            await db.spotifyPlaybackState.upsert({
                where: {
                    id: 1,
                },
                update: {
                    state_json: JSON.stringify(context),
                },
                create: {
                    id: 1,
                    state_json: JSON.stringify(context),
                },
            })
        })
        .catch(console.error)
}

function log(message: string) {
    return
    console.clear()
    console.info(message)
}

