import trackPlayback from "./playback"
import checkForRefresh from "./refreshToken"
import removeQueue from "./removeQueue"
import setVolume from "./setVolume"

checkForRefresh().then(() => {
    setInterval(() => {
        checkForRefresh()
    }, 10_000)
    setInterval(() => {
        trackPlayback()
    }, 1000)

    setInterval(() => {
        setVolume().then(() => {
            removeQueue()
        })
    }, 500)

    trackPlayback()
})
