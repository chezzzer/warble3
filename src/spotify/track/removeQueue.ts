import { db } from "@/server/db"
import { PlaybackState } from "@spotify/web-api-ts-sdk"

export default async function removeQueue() {
    const firstInQueue = await db.request.findFirst()

    if (!firstInQueue) {
        return
    }

    const contextJson = await db.spotifyPlaybackState.findFirst()

    if (!contextJson) {
        return
    }

    const context = JSON.parse(contextJson.state_json) as PlaybackState

    if (context.item.id === firstInQueue.spotifyId) {
        await db.request.delete({
            where: {
                id: firstInQueue.id,
            },
        })
    }
}
