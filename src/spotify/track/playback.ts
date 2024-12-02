import { SpotifyPlaybackState } from "@/lib/Spotify/SpotifyPlaybackState"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"

const spotifyPlaybackState = new SpotifyPlaybackState()

export default async function trackPlayback() {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    spotify.player
        .getPlaybackState()
        .then(async (context) => {
            if (context === null) {
                spotifyPlaybackState.clear()
                return
            }

            await spotifyPlaybackState.set(context)
        })
        .catch(console.error)
}
