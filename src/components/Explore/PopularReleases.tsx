import { getPopularArtists } from "@/lib/Spotify/SpotifyPopularArtists"
import { unstable_cache } from "next/cache"
import ArtistCarousel from "../Artist/ArtistCarousel"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { extractUri } from "@/lib/Spotify/SpotifyUtils"
import { limitArray, shuffleArray } from "@/lib/utils"
import { getNewReleases } from "@/lib/Spotify/SpotifyNewReleases"
import AlbumCarousel from "../Album/AlbumCarousel"
import { SimplifiedAlbum } from "@spotify/web-api-ts-sdk"
import { getPopularReleases } from "@/lib/Spotify/SpotifyPopularReleases"

const getPopularReleasesCache = unstable_cache(
    async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const albums = await getPopularReleases(30)

        return spotify.albums.get(
            limitArray(shuffleArray(albums), 20).map(
                (a) => extractUri(a.uri).id
            )
        )
    },
    ["popularReleases"],
    { tags: ["popularReleases"] }
)

export default async function PopularReleases() {
    const albums = await getPopularReleasesCache()

    return (
        <>
            <h1 className="px-5 pb-3 pt-10 text-2xl opacity-75">
                Popular Releases
            </h1>
            <AlbumCarousel
                albums={shuffleArray(albums) as unknown as SimplifiedAlbum[]}
            />
        </>
    )
}
