import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { unstable_cache } from "next/cache"
import TrackCarousel from "../Track/TrackCarousel"
import { shuffleArray } from "@/lib/utils"

const getFeaturedPlaylistCache = unstable_cache(
    async (id: string) => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        return spotify.playlists.getPlaylist(id)
    },
    ["homeArtist"],
    { tags: ["homeArtist"] }
)

export default async function FeaturedPlaylist({ id }: { id: string }) {
    const playlist = await getFeaturedPlaylistCache(id)

    return (
        <>
            <h1 className="mb-3 mt-10 px-5 text-2xl opacity-75">
                {playlist.name}
            </h1>
            <TrackCarousel
                tracks={shuffleArray(playlist.tracks.items).map((t) => t.track)}
            />
        </>
    )
}
