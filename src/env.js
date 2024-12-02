import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        DATABASE_URL: z.string().url(),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),

        //Spotify
        SPOTIFY_CLIENT_ID: z.string(),
        SPOTIFY_CLIENT_SECRET: z.string(),
        SPOTIFY_REDIRECT_URI: z.string(),

        //Lyrics
        MUSIXMATCH_USERTOKENS: z.string(),
        MUSIXMATCH_API_KEY: z.string(),

        //Auth
        AUTH_SECRET: z.string(),

        //Redis
        REDIS_HOST: z.string(),
        REDIS_PORT: z.string(),
        REDIS_PASSWORD: z.string(),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        // NEXT_PUBLIC_CLIENTVAR: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
        SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI,
        MUSIXMATCH_USERTOKENS: process.env.MUSIXMATCH_USERTOKENS,
        MUSIXMATCH_API_KEY: process.env.MUSIXMATCH_API_KEY,
        AUTH_SECRET: process.env.AUTH_SECRET,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
        // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
})
