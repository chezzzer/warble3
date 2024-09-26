import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { observable } from "@trpc/server/observable"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { PlaybackState, SpotifyApi, Track } from "@spotify/web-api-ts-sdk"
import SpotifyContext from "@/lib/Spotify/SpotifyContext"

export const playerRouter = createTRPCRouter({
    getContext: publicProcedure.query(async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()
        return (await spotify.player.getCurrentlyPlayingTrack()) as PlaybackState | null
    }),

    subscribeContext: publicProcedure.subscription(async () => {
        return observable<PlaybackState | null>((emit) => {
            const context = SpotifyContext.make()

            const sendContext = (context: PlaybackState | null) => {
                emit.next(context)
            }

            context.events.on("change", sendContext)

            const interval = context.startTracking(1000)
            return () => {
                clearInterval(interval)
                context.events.off("change", sendContext)
            }
        })
    }),

    subscribeProgress: publicProcedure.subscription(async () => {
        return observable<number | null>((emit) => {
            const context = SpotifyContext.make()

            const sendProgress = (progress_ms: number) => emit.next(progress_ms)

            context.events.on("progress", sendProgress)

            const interval = context.startTracking(1000)
            return () => {
                clearInterval(interval)
                context.events.off("progress", sendProgress)
            }
        })
    }),
})

