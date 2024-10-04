import getExtractedColors from "@/lib/Spotify/GetExtractedColors"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import CategoryHero from "./CategoryHero"
import FeaturedPlaylist from "../Explore/FeaturedPlaylist"
import Playlist from "../Playlist/Playlist"

export async function CategoryProfile({ categoryId }: { categoryId: string }) {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    const [category, playlists] = await Promise.all([
        spotify.browse.getCategory(categoryId),
        spotify.browse.getPlaylistsForCategory(categoryId),
    ])
    const [color] = await getExtractedColors([category.icons[0].url])

    return (
        <div className="flex flex-col gap-10">
            <div>
                <CategoryHero category={category} color={color} />
            </div>
            <div className="px-5">
                <h1 className="mb-3 mt-10 text-2xl opacity-75">Categories</h1>
                <div className="grid grid-cols-6 gap-5">
                    {playlists.playlists.items.map((playlist) => (
                        <Playlist key={playlist.id} playlist={playlist} />
                    ))}
                </div>
            </div>
        </div>
    )
}
