import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { MaxInt } from "@spotify/web-api-ts-sdk"
import { getPreviewUrl } from "@/lib/Spotify/SpotifyPreviewUrl"
import { search } from "@/lib/Spotify/SpotifySearch"

export const spotifyRouter = createTRPCRouter({
    getHistory: publicProcedure
        .input(
            z
                .object({
                    limit: z.number().max(50).min(1),
                })
                .optional()
        )
        .query(async ({ input }) => {
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            const history = await spotify.player.getRecentlyPlayedTracks(
                (input?.limit as MaxInt<50> | undefined) || 50
            )

            return history.items.map((i) => i.track)
        }),

    search: publicProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ input }) => {
            const results = await search(input.query, 30)

            return results
        }),

    getPreviewUrl: publicProcedure
        .input(z.object({ trackId: z.string() }))
        .query(async ({ input }) => {
            const url = await getPreviewUrl(input.trackId)

            return url
        }),
})
