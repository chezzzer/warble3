import { Artist, Track } from "@spotify/web-api-ts-sdk"
import ArtistCarousel from "./ArtistCarousel"

export default function ArtistRelatedArtists({
    artists,
}: {
    artists: Artist[]
}) {
    return (
        <>
            <h1 className="mb-3 px-5 text-2xl opacity-75">Fans also like</h1>
            <ArtistCarousel artists={artists} />
        </>
    )
}
