import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { Artist, MaxInt, Track } from "@spotify/web-api-ts-sdk"
import getExtraArtistInfo, {
    ArtistInfo,
} from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { getPreviewUrl } from "@/lib/Spotify/SpotifyPreviewUrl"

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
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            const search = await spotify.search(input.query, [
                "album",
                "artist",
                "track",
                "playlist",
            ])

            return {
                albums: search.albums.items,
                artists: search.artists.items,
                tracks: search.tracks.items,
                playlists: search.playlists.items,
            }
        }),

    getPreviewUrl: publicProcedure
        .input(z.object({ trackId: z.string() }))
        .query(async ({ input }) => {
            const url = await getPreviewUrl(input.trackId)

            return url
        }),
})
