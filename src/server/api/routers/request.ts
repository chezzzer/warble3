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

        const requests = await db.request.findMany({
            where: {
                current: false,
            },
        })

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

    current: publicProcedure.query(async () => {
        return await db.request.findFirst({
            where: {
                current: true,
            },
        })
    }),

    onChange: publicProcedure.subscription(async () => {
        let queueBodyLength: number | null = null
        const spotify = await SpotifyProvider.makeFromDatabaseCache()
        return observable<RequestItem[]>((emit) => {
            const sendRequests = async () => {
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
            }

            const check = async () => {
                const queue = await db.request.findMany()

                const control = JSON.stringify(queue).length

                if (queueBodyLength === control) {
                    return
                }

                queueBodyLength = control

                await sendRequests()
            }

            const interval = setInterval(() => {
                check()
            }, 1000)

            return () => {
                clearInterval(interval)
            }
        })
    }),
})
