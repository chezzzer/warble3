import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc"
import { requestRouter } from "./routers/request"
import { playerRouter } from "./routers/player"
import { spotifyRouter } from "./routers/spotify"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    request: requestRouter,
    player: playerRouter,
    spotify: spotifyRouter,
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

