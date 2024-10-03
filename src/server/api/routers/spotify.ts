import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { Artist, MaxInt, Track } from "@spotify/web-api-ts-sdk"
import getExtraArtistInfo, {
    ArtistInfo,
} from "@/lib/Spotify/SpotifyExtraArtistInfo"

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
})

