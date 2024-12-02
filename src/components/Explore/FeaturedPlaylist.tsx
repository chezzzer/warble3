import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { unstable_cache } from "next/cache"
import TrackCarousel from "../Track/TrackCarousel"
import { shuffleArray } from "@/lib/utils"
import { Warning } from "@phosphor-icons/react/dist/ssr"
import InLineError from "../Misc/InLineError"

const getFeaturedPlaylistCache = unstable_cache(
    async (id: string) => {
        try {
            const spotify = await SpotifyProvider.makeFromDatabaseCache()

            return await spotify.playlists.getPlaylist(id)
        } catch {
            return null
        }
    },
    ["homeArtist"],
    { tags: ["homeArtist"] }
)

export default async function FeaturedPlaylist({ id }: { id: string }) {
    const playlist = await getFeaturedPlaylistCache(id)

    if (!playlist) {
        return (
            <InLineError
                error={
                    <>
                        Unable to load <pre>spotify:playlist:{id}</pre>
                    </>
                }
            />
        )
    }

    return (
        <>
            <h1 className="px-5 pb-3 pt-10 text-2xl opacity-75">
                {playlist.name}
            </h1>
            <TrackCarousel
                tracks={shuffleArray(playlist.tracks.items).map((t) => t.track)}
            />
        </>
    )
}
