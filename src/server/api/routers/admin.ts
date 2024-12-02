import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { authProcedure, createTRPCRouter } from "@/server/api/trpc"
import { db } from "@/server/db"
import { z } from "zod"

export const adminRouter = createTRPCRouter({
    removeRequest: authProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
            await db.request.delete({
                where: {
                    id: input.id,
                },
            })
        }),

    editRequestSinger: authProcedure
        .input(
            z.object({
                id: z.number(),
                singer: z.string(),
                spotifyId: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            try {
                await spotify.tracks.get(input.spotifyId)
            } catch {
                throw new Error("Invalid Spotify ID")
            }

            try {
                await db.request.update({
                    where: {
                        id: input.id,
                    },
                    data: {
                        name: input.singer,
                        spotifyId: input.spotifyId,
                    },
                })
            } catch (e) {
                console.error(e)
                throw new Error("Failed to update request")
            }
        }),
})
