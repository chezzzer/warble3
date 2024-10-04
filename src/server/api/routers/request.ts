import { number, z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { observable } from "@trpc/server/observable"
import { db } from "@/server/db"
import { Request } from "@prisma/client"
import EventEmitter from "events"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { Track } from "@spotify/web-api-ts-sdk"

export type RequestItem = Request & { track: Track }

export const requestRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                spotifyId: z.string(),
                name: z.string().nullable(),
            })
        )
        .mutation(async ({ input }) => {
            if (!input.name) {
                throw new Error("Name is required")
            }

            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            const request = await db.request.create({
                data: {
                    spotifyId: input.spotifyId,
                    name: input.name,
                },
            })

            const track = await spotify.tracks.get(request.spotifyId)

            try {
                await spotify.player.addItemToPlaybackQueue(track.uri)
            } catch {
                //fuck off spotify api
            }

            return {
                ...request,
                track: track,
            }
        }),

    get: publicProcedure.query(async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const requests = await db.request.findMany()

        if (requests.length === 0) {
            return []
        }

        const tracks = await spotify.tracks.get(
            requests.map((r) => r.spotifyId)
        )

        return requests.map((r, i) => ({
            ...r,
            track: tracks[i],
        }))
    }),

    onChange: publicProcedure.subscription(async () => {
        let queueIdSum: string | null = null
        const spotify = await SpotifyProvider.makeFromDatabaseCache()
        return observable<RequestItem[]>((emit) => {
            const interval = setInterval(async () => {
                const queue = await db.request.findMany()

                if (queueIdSum === queue.map((q) => q.id).join("")) {
                    return
                }

                queueIdSum = queue.map((q) => q.id).join("")

                const requests = await db.request.findMany()

                if (requests.length === 0) {
                    emit.next([])
                    return
                }

                const tracks = await spotify.tracks.get(
                    requests.map((r) => r.spotifyId)
                )

                emit.next(
                    requests.map((r, i) => ({
                        ...r,
                        track: tracks[i],
                    }))
                )
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        })
    }),
})
