import { env } from "@/env"
import { createClient, RedisClientType } from "redis"

const client = createClient({
    url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
    password: env.REDIS_PASSWORD,
})

export const redis = await client
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect()

export function createRedisClient() {
    return client.duplicate()
}
