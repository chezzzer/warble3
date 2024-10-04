import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { warbleLog } from "@/lib/Warble"
import { db } from "@/server/db"
import { Track } from "@spotify/web-api-ts-sdk"

export default async function trackPlayback() {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    spotify.player
        .getPlaybackState()
        .then(async (context) => {
            if (context === null) {
                warbleLog("🎵 No song playing")
                await db.spotifyPlaybackState.deleteMany()
                return
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
