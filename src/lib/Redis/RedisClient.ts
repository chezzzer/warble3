import { env } from "@/env"
import { createClient } from "redis"

export const redis = await createClient({
    url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
    password: env.REDIS_PASSWORD,
})
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect()
