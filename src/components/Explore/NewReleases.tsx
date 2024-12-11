import { getPopularArtists } from "@/lib/Spotify/SpotifyPopularArtists"
import { unstable_cache } from "next/cache"
import ArtistCarousel from "../Artist/ArtistCarousel"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { extractUri } from "@/lib/Spotify/SpotifyUtils"
import { limitArray, shuffleArray } from "@/lib/utils"
import { getNewReleases } from "@/lib/Spotify/SpotifyNewReleases"
import AlbumCarousel from "../Album/AlbumCarousel"
import { SimplifiedAlbum } from "@spotify/web-api-ts-sdk"

const getNewReleasesCache = unstable_cache(
    async () => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const albums = await getNewReleases(100)

        return spotify.albums.get(
            limitArray(shuffleArray(albums), 20).map(
                (a) => extractUri(a.uri).id
            )
        )
    },
    ["newReleases"],
    { tags: ["newReleases"] }
)

export default async function NewReleases() {
    const albums = await getNewReleasesCache()

    return (
        <>
            <h1 className="px-5 pb-3 pt-10 text-2xl opacity-75">
                New Releases
            </h1>
            <AlbumCarousel
                albums={shuffleArray(albums) as unknown as SimplifiedAlbum[]}
            />
        </>
    )
}
