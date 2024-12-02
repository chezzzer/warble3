import { MusixmatchLyrics } from "musixmatch-richsync"
import { redis } from "../Redis/RedisClient"
import { KeyedCacheRepo } from "../Interfaces/CacheRepo"

export class LyricsRedisCache implements KeyedCacheRepo<MusixmatchLyrics> {
    REDIS_KEY = "lyrics"

    async get(key: string) {
        const lyrics = await redis.get(key)

        if (!lyrics) {
            return null
        }

        return JSON.parse(lyrics) as MusixmatchLyrics
    }

    async set(key: string, lyrics: MusixmatchLyrics) {
        await redis.set(key, JSON.stringify(lyrics))
    }

    async clear(key: string) {
        await redis.del(key)
    }

    generateKey(isrc: string, type: string) {
        return `${this.REDIS_KEY}:${isrc}:${type}`
    }
}
