import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import TrackTable from "../Track/TrackTable"
import PlaylistHero from "./PlaylistHero"
import getExtractedColors from "@/lib/Spotify/GetExtractedColors"

export async function PlaylistProfile({ playlistId }: { playlistId: string }) {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    const playlist = await spotify.playlists.getPlaylist(playlistId)
    const [color] = await getExtractedColors([playlist.images[0].url])

    return (
        <div className="flex flex-col gap-10">
            <div>
                <PlaylistHero playlist={playlist} color={color} />
            </div>
            <div className="px-5">
                <TrackTable
                    tracks={playlist.tracks.items.map((t) => t.track)}
                />
            </div>
        </div>
    )
}