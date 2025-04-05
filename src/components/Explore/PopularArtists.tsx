import { getPopularArtists } from "@/lib/Spotify/SpotifyPopularArtists"
import { unstable_cache } from "next/cache"
import ArtistCarousel from "../Artist/ArtistCarousel"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { extractUri } from "@/lib/Spotify/SpotifyUtils"
import { shuffleArray } from "@/lib/utils"

const getPopularArtistsCache = unstable_cache(
    async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const artists = await getPopularArtists(50)

        return spotify.artists.get(artists.map((a) => extractUri(a.uri).id))
    },
    ["popularArtists"],
    { tags: ["popularArtists"] }
)

export default async function PopularArtists() {
    try {
        const artists = await getPopularArtistsCache()

        return (
            <>
                <h1 className="px-5 pb-3 pt-10 text-2xl opacity-75">
                    Popular Artists
                </h1>
                <ArtistCarousel artists={shuffleArray(artists)} />
            </>
        )
    } catch (e) {
        console.error(e)
        return null
    }
}
