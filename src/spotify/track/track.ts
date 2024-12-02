import { warbleLog } from "@/lib/Warble"
import trackPlayback from "./playback"
import checkForRefresh from "./refreshToken"
import removeQueue from "./removeQueue"
import setVolume from "./setVolume"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"

try {
    SpotifyProvider.makeFromDatabaseCache().then(async (spotify) => {
        const profile = await spotify.currentUser.profile()
        warbleLog(`Now tracking Spotify playback from ${profile.display_name}`)
    })

    checkForRefresh().then(() => {
        setInterval(() => {
            checkForRefresh()
        }, 10_000)
        setInterval(() => {
            trackPlayback().then(() => {
                setVolume().then(() => {
                    removeQueue()
                })
            })
        }, 1000)

        trackPlayback()
    })
} catch (e) {
    console.error(e)
}
