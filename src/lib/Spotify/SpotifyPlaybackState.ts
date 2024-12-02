import { PlaybackState } from "@spotify/web-api-ts-sdk"
import { redis } from "../Redis/RedisClient"
import { CacheRepo } from "../Interfaces/CacheRepo"

export class SpotifyPlaybackState implements CacheRepo<PlaybackState> {
    REDIS_KEY = "spotify:playback"

    async set(state: PlaybackState) {
        await redis.set(this.REDIS_KEY, JSON.stringify(state))
    }

    async get(): Promise<PlaybackState | null> {
        const state = await redis.get(this.REDIS_KEY)
        if (!state) {
            return null
        }

        return JSON.parse(state) as PlaybackState
    }

    async clear() {
        await redis.del(this.REDIS_KEY)
    }
}
