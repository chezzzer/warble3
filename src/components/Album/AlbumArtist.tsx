import { Album, SimplifiedAlbum } from "@spotify/web-api-ts-sdk"
import AlbumCarousel from "../Album/AlbumCarousel"

export default function AlbumArtist({ albums }: { albums: SimplifiedAlbum[] }) {
    return (
        <>
            <h1 className="mb-5 px-5 text-2xl opacity-75">
                More from {albums[0]?.artists[0].name || "this artist"}
            </h1>
            <AlbumCarousel albums={albums} />
        </>
    )
}
