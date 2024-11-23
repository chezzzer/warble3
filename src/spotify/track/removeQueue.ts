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
        await db.request.update({
            where: {
                id: firstInQueue.id,
            },
            data: {
                current: true,
            },
        })
    } else {
        const currentRequest = await db.request.findFirst({
            where: {
                current: true,
            },
        })

        if (currentRequest) {
            await db.request.delete({
                where: {
                    id: currentRequest.id,
                },
            })
        }
    }
}
