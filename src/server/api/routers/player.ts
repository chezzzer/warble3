import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { observable } from "@trpc/server/observable"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { PlaybackState, SpotifyApi, Track } from "@spotify/web-api-ts-sdk"
import SpotifyContext from "@/lib/Spotify/SpotifyContext"
import { PlayerEvent } from "@/lib/Events/PlayerEvent"
import { Progress } from "@/lib/Context/SpotifyContext"
import { z } from "zod"
import { extractUri } from "@/lib/Spotify/SpotifyUtils"

export const playerRouter = createTRPCRouter({
    getContext: publicProcedure.query(async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()
        return (await spotify.player.getCurrentlyPlayingTrack()) as PlaybackState | null
    }),

    getContextItem: publicProcedure.query(async ({ input }) => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const context = await spotify.player.getCurrentlyPlayingTrack()

        if (context?.context?.type === "playlist") {
            return await spotify.playlists.getPlaylist(
                extractUri(context.context.uri).id
            )
        }

        return null
    }),

    subscribe: publicProcedure.subscription(async () => {
        return observable<
            PlayerEvent<PlaybackState | null> | PlayerEvent<Progress | null>
        >((emit) => {
            const context = SpotifyContext.make()

            const sendContext = (context: PlaybackState | null) => {
                emit.next({
                    name: "context",
                    data: context,
                })
            }

            const sendProgress = (progress_ms: number) =>
                emit.next({
                    name: "progress",
                    data: progress_ms,
                })

            context.events.on("change", sendContext)
            context.events.on("progress", sendProgress)

            const interval = context.startTracking(1000)
            return () => {
                clearInterval(interval)
                context.events.off("change", sendContext)
                context.events.off("progress", sendProgress)
            }
        })
    }),
})
