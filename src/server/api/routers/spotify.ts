import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { Artist, Track } from "@spotify/web-api-ts-sdk"
import getExtraArtistInfo, {
    ArtistInfo,
} from "@/lib/Spotify/SpotifyExtraArtistInfo"

export const spotifyRouter = createTRPCRouter({
    getRecommendations: publicProcedure
        .input(
            z.object({
                seed_genres: z.array(z.string()).optional(),
                seed_artists: z.array(z.string()).optional(),
                seed_tracks: z.array(z.string()).optional(),
                limit: z.number().optional(),
            })
        )
        .query(async ({ input }) => {
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            const recommendations = await spotify.recommendations.get(input)

            return recommendations.tracks
        }),

    getHomeArtist: publicProcedure.query(async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()
        const homeTracks = await spotify.recommendations.get({
            seed_genres: ["pop", "rock-n-roll", "britpop"],
            limit: 2,
        })

        const validTracks = homeTracks.tracks.filter(
            (t) => t && t.artists[0]?.id
        )

        if (validTracks.length === 0) {
            throw new Error("No valid tracks found")
        }

        const id = validTracks[0]?.artists[0]?.id!

        const [artist, artistInfo] = await Promise.all([
            spotify.artists.get(id),
            getExtraArtistInfo(id),
        ])

        return {
            ...artist,
            ...artistInfo,
        } as Artist & ArtistInfo
    }),
})

