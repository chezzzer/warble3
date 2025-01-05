import { useEffect } from "react"

export default function useKeepAwake() {
    useEffect(() => {
        try {
            if ("wakeLock" in navigator) {
                navigator.wakeLock.request("screen").then(() => {
                    console.debug("Screen Wake Lock Acquired")
                })
            }
        } catch (e) {
            console.error("Error requesting screen wake", e)
        }
    }, [])
}
