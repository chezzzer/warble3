import { Album, SimplifiedAlbum } from "@spotify/web-api-ts-sdk"
import AlbumCarousel from "../Album/AlbumCarousel"

export default function ArtistPopularAlbums({
    albums,
}: {
    albums: SimplifiedAlbum[]
}) {
    return (
        <>
            <h1 className="mb-3 px-5 text-2xl opacity-75">Popular Releases</h1>
            <AlbumCarousel albums={albums} />
        </>
    )
}
