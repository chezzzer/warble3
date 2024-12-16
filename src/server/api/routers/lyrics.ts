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
import { db } from "@/server/db"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"

export const lyricsRouter = createTRPCRouter({
    getLyricInfo: publicProcedure.query(async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const context = await spotify.player.getPlaybackState()
        const track = context.item as Track

        return await getLyricsInfo(track.external_ids.isrc)
    }),

    subscribe: publicProcedure.subscription(async () => {
        return observable<
            | LyricEvent<PlaybackState | null>
            | LyricEvent<Progress | null>
            | LyricEvent<LyricLine[] | null>
        >((emit) => {
            let progress_cache = 0
            let sync_cache = 0
            let richsync_enabled_cache = true

            const context = SpotifyContext.make()

            const sendContext = (context: PlaybackState | null) => {
                emit.next({
                    name: "context",
                    data: context,
                })
            }

            const sendProgress = (progress_ms: number) => {
                if (progress_cache !== progress_ms) {
                    progress_cache = progress_ms
                    emit.next({
                        name: "progress",
                        data: progress_ms + sync_cache,
                    })
                }
            }

            const sendLyrics = (context: PlaybackState | null) => {
                ;(async () => {
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
                            data: await getLyricsFallback(
                                track.external_ids.isrc,
                                richsync_enabled_cache
                                    ? null
                                    : musixmatch.LYRIC_TYPES.SUBTITLES
                            ),
                        })
                    } catch (e) {
                        console.error("Lyrics Error", e)
                        emit.next({
                            name: "lyrics",
                            data: null,
                        })
                    }
                })()
            }

            const updateSettings = () => {
                db.settings
                    .findFirst({
                        where: {
                            name: "lyrics.karaoke_sync",
                        },
                    })
                    .then(async (setting) => {
                        if (!setting) return
                        sync_cache = Number.parseInt(setting.value)
                    })

                db.settings
                    .findFirst({
                        where: {
                            name: "lyrics.richsync_enabled",
                        },
                    })
                    .then(async (setting) => {
                        if (!setting) return
                        if (
                            richsync_enabled_cache !==
                            (setting.value === "true")
                        ) {
                            richsync_enabled_cache = setting.value === "true"
                            sendLyrics(context.getContext())
                        }
                    })
            }

            context.events.on("track", sendLyrics)
            context.events.on("progress", sendProgress)
            context.events.on("change", sendContext)

            const interval = context.startTracking(100)
            const settingsInterval = setInterval(updateSettings, 1000)
            updateSettings()
            return () => {
                clearInterval(interval)
                clearInterval(settingsInterval)
                context.events.off("track", sendLyrics)
                context.events.off("change", sendContext)
                context.events.off("progress", sendProgress)
            }
        })
    }),
})
