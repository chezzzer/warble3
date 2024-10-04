import { Album, SimplifiedAlbum } from "@spotify/web-api-ts-sdk"
import AlbumCarousel from "../Album/AlbumCarousel"

export default function ArtistAlbums({
    albums,
}: {
    albums: SimplifiedAlbum[]
}) {
    return (
        <>
            <h1 className="mb-3 px-5 text-2xl opacity-75">Discography</h1>
            <AlbumCarousel albums={albums} />
        </>
    )
}
