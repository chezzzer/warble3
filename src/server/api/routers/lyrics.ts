import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { observable } from "@trpc/server/observable"
import { PlaybackState, SpotifyApi, Track } from "@spotify/web-api-ts-sdk"
import SpotifyContext from "@/lib/Spotify/SpotifyContext"
import {
    getLyricsDataFallback,
    getLyricsFallback,
    LyricLine,
} from "@/lib/Lyrics/LyricsCacheProvider"
import { Progress } from "@/lib/Context/SpotifyContext"
import { LyricEvent } from "@/lib/Events/LyricEvent"
import { LyricsRedisCache } from "@/lib/Lyrics/LyricsRedisCache"
import { SpotifyPlaybackState } from "@/lib/Spotify/SpotifyPlaybackState"
import musixmatch from "@/lib/Lyrics/LyricsProvider"
import { z } from "zod"
import getLyricsInfo from "@/lib/Lyrics/LyricsInfo"

export const lyricsRouter = createTRPCRouter({
    getLyricInfo: publicProcedure
        .input(z.object({ isrc: z.string() }))

        .query(async ({ input }) => {
            return await getLyricsInfo(input.isrc)
        }),

    subscribe: publicProcedure.subscription(async () => {
        return observable<
            | LyricEvent<PlaybackState | null>
            | LyricEvent<Progress | null>
            | LyricEvent<LyricLine[] | null>
        >((emit) => {
            const context = SpotifyContext.make()

            const sendContext = (context: PlaybackState | null) => {
                emit.next({
                    name: "context",
                    data: context,
                })
            }

            let progress_cache = 0
            const sendProgress = (progress_ms: number) => {
                if (progress_cache !== progress_ms) {
                    progress_cache = progress_ms
                    emit.next({
                        name: "progress",
                        data: progress_ms,
                    })
                }
            }

            const sendLyrics = async (context: PlaybackState | null) => {
                if (!context || !context.item) {
                    emit.next({
                        name: "lyrics",
                        data: null,
                    })
                    return
                }

                const track = context.item as Track

                try {
                    emit.next({
                        name: "lyrics",
                        data: await getLyricsFallback(track.external_ids.isrc),
                    })
                } catch (e) {
                    console.error("Lyrics Error", e)
                    emit.next({
                        name: "lyrics",
                        data: null,
                    })
                }
            }

            context.events.on("track", sendLyrics)
            context.events.on("progress", sendProgress)
            context.events.on("change", sendContext)

            const interval = context.startTracking(100)
            return () => {
                clearInterval(interval)
                context.events.off("track", sendLyrics)
                context.events.off("change", sendContext)
                context.events.off("progress", sendProgress)
            }
        })
    }),
})
