import trackPlayback from "./playback"
import checkForRefresh from "./refreshToken"

checkForRefresh().then(() => {
    setInterval(() => {
        checkForRefresh()
    }, 10_000)
    setInterval(() => {
        trackPlayback()
    }, 500)

    trackPlayback()
})

