import getExtractedColors from "@/lib/Spotify/GetExtractedColors"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { SimplifiedAlbum, Track } from "@spotify/web-api-ts-sdk"
import TrackTable from "../Track/TrackTable"
import AlbumArtist from "./AlbumArtist"
import AlbumHero from "./AlbumHero"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"

export async function AlbumProfile({ albumId }: { albumId: string }) {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    const album = await spotify.albums.get(albumId)
    const [color] = await getExtractedColors([
        getLargestImage(album.images)?.url,
    ])

    const artistAlbums = await spotify.artists.albums(album.artists[0].id)

    const items = album.tracks.items.map((track, i) => ({
        ...track,
        album: album as unknown as SimplifiedAlbum,
    }))

    return (
        <div className="flex flex-col gap-10">
            <div>
                <AlbumHero album={album} color={color} />
            </div>
            <div className="px-5">
                <TrackTable tracks={items as Track[]} />
            </div>
            {artistAlbums.total > 0 && (
                <div className="px-5">
                    <AlbumArtist albums={artistAlbums.items} />
                </div>
            )}
        </div>
    )
}
