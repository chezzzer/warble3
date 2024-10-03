import trackPlayback from "./playback"
import checkForRefresh from "./refreshToken"
import removeQueue from "./removeQueue"

checkForRefresh().then(() => {
    setInterval(() => {
        checkForRefresh()
    }, 10_000)
    setInterval(() => {
        trackPlayback()
    }, 1000)

    trackPlayback()
})

setInterval(() => {
    removeQueue()
}, 500)

