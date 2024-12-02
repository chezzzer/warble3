import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"
import { requestRouter } from "./routers/request"
import { playerRouter } from "./routers/player"
import { spotifyRouter } from "./routers/spotify"
import { lyricsRouter } from "./routers/lyrics"
import { adminRouter } from "./routers/admin"
import { settingsRouter } from "./routers/settings"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    settings: settingsRouter,
    request: requestRouter,
    player: playerRouter,
    spotify: spotifyRouter,
    lyrics: lyricsRouter,
    admin: adminRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
