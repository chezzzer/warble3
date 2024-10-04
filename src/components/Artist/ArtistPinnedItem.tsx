import { ArtistInfoPinnedItem } from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { extractUri, getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import Link from "next/link"
import { Badge } from "../ui/badge"

export default function ArtistPinnedItem({
    item,
}: {
    item: ArtistInfoPinnedItem
}) {
    if (!["ALBUM", "PLAYLIST"].includes(item.type)) {
        return null
    }

    const { type, id } = extractUri(item.item.uri)

    return (
        <Link href={`/${type}/${id}`}>
            <div
                className="flex h-[250px] w-full flex-col justify-between rounded-lg p-5"
                style={{
                    background: `linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(0, 0, 0, .8)), url("${item.backgroundImage}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div>{item.comment && <Badge>{item.comment}</Badge>}</div>
                <div className="flex items-end gap-5">
                    {item.item.images && (
                        <div>
                            <img
                                src={getLargestImage(item.item.images).url}
                                className="aspect-square rounded-lg object-cover"
                                width={100}
                                height={100}
                            />
                        </div>
                    )}
                    <div>
                        <h3 className="text-xl font-semibold">
                            {item.item.name}
                        </h3>
                        <p className="text-md opacity-75">{item.item.type}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
