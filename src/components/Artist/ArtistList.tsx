import { SimplifiedAlbum, SimplifiedArtist } from "@spotify/web-api-ts-sdk"
import Link from "next/link"

export default function ArtistList({
    artists,
    underline = true,
}: {
    artists: SimplifiedArtist[]
    underline?: boolean
}) {
    return (
        <>
            {artists.map((artist, i) => (
                <>
                    <Link
                        key={artist.id}
                        href={`/app/artist/${artist.id}`}
                        className={underline && "underline"}
                    >
                        {artist.name}
                        {i !== artists.length - 1 && ","}
                    </Link>{" "}
                </>
            ))}
        </>
    )
}
