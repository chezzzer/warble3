import { number, z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { observable } from "@trpc/server/observable"
import { db } from "@/server/db"
import { Request } from "@prisma/client"
import EventEmitter from "events"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { Track } from "@spotify/web-api-ts-sdk"

const ee = new EventEmitter()

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
                spotify.player.addItemToPlaybackQueue(track.uri)
            } catch {
                //fuck off spotify api
            }

            ee.emit("request", {
                ...request,
                track: track,
            })

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

    onRequest: publicProcedure.subscription(async () => {
        return observable<RequestItem>((emit) => {
            const onRequest = async (request: RequestItem) => {
                emit.next(request)
            }

            ee.on("request", onRequest)

            return () => {
                ee.off("request", onRequest)
            }
        })
    }),
})
