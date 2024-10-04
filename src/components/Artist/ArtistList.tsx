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
                        href={`/artist/${artist.id}`}
                        className="underline underline-offset-2"
                    >
                        {artist.name}
                        {i !== artists.length - 1 && ","}
                    </Link>{" "}
                </>
            ))}
        </>
    )
}
