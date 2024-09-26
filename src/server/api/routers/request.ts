import { number, z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { observable } from "@trpc/server/observable"
import { db } from "@/server/db"
import { Request } from "@prisma/client"
import EventEmitter from "events"

const ee = new EventEmitter()

export const requestRouter = createTRPCRouter({
    create: publicProcedure
        .input(
            z.object({
                spotifyId: z.string(),
                name: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const request = await db.request.create({
                data: {
                    spotifyId: input.spotifyId,
                    name: input.name,
                },
            })

            ee.emit("request", request)

            return request
        }),

    get: publicProcedure.query(async () => {
        const requests = await db.request.findMany()
        return requests
    }),

    onRequest: publicProcedure.subscription(() => {
        return observable<Request>((emit) => {
            const onRequest = (request: Request) => {
                emit.next(request)
            }

            ee.on("request", onRequest)

            return () => {
                ee.off("request", onRequest)
            }
        })
    }),
})

