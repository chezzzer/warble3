import {
    authProcedure,
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc"
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

    playPause: authProcedure.mutation(async () => {
        try {
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            const context = await spotify.player.getPlaybackState()
            if (context.device?.is_active) {
                if (context.is_playing) {
                    await spotify.player.pausePlayback(context.device.id)
                } else {
                    await spotify.player.startResumePlayback(context.device.id)
                }
            }
        } catch {}
    }),

    next: authProcedure.mutation(async () => {
        try {
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            const context = await spotify.player.getPlaybackState()
            if (context.device?.is_active) {
                await spotify.player.skipToNext(context.device.id)
            }
        } catch {}
    }),

    previous: authProcedure.mutation(async () => {
        try {
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            const context = await spotify.player.getPlaybackState()
            if (context.device?.is_active) {
                await spotify.player.skipToPrevious(context.device.id)
            }
        } catch {}
    }),

    rewind: authProcedure.mutation(async () => {
        try {
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            const context = await spotify.player.getPlaybackState()
            if (context.device?.is_active) {
                await spotify.player.seekToPosition(0, context.device.id)
            }
        } catch {}
    }),

    setVolume: authProcedure
        .input(z.object({ volume: z.number() }))
        .mutation(async ({ input }) => {
            try {
                const spotify = await SpotifyProvider.makeFromDatabaseCache()
                await spotify.player.setPlaybackVolume(input.volume)
            } catch {}
        }),
})
