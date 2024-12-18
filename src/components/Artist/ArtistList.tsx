import { SimplifiedAlbum, SimplifiedArtist } from "@spotify/web-api-ts-sdk"
import Link from "next/link"

export default function ArtistList({
    artists,
}: {
    artists: SimplifiedArtist[]
}) {
    return (
        <>
            {artists.map((artist, i) => (
                <>
                    <Link
                        key={artist.id}
                        href={`/app/artist/${artist.id}`}
                        className="underline"
                    >
                        {artist.name}
                        {i !== artists.length - 1 && ","}
                    </Link>{" "}
                </>
            ))}
        </>
    )
}
