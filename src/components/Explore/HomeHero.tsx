import { Badge } from "../ui/badge"
import { limitArray } from "@/lib/utils"
import { Button } from "../ui/button"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import getExtraArtistInfo from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { unstable_cache } from "next/cache"
import Link from "next/link"
import { extractUri, getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import { getRandomPopularArtist } from "@/lib/Spotify/SpotifyPopularArtists"

const getArtistCache = unstable_cache(
    async (id: string) => {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        return await spotify.artists.get(id)
    },
    ["artistInfoCache"],
    { tags: ["artistInfoCache"] }
)

const getArtistInfoCache = unstable_cache(
    async (id: string) => {
        return await getExtraArtistInfo(id)
    },
    ["artistInfoCache"],
    { tags: ["artistInfoCache"] }
)

export default async function HomeHero() {
    const artistId = extractUri((await getRandomPopularArtist()).uri).id

    const [artist, artistInfo] = await Promise.all([
        getArtistCache(artistId),
        getArtistInfoCache(artistId),
    ])

    if (!artist) {
        return <div>&nbsp;</div>
    }

    return (
        <>
            <div
                className="dark relative flex h-[300px] flex-col justify-end p-10 text-white"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${artistInfo?.visuals.headerImage?.color || "#000000"}, ${artistInfo?.visuals.headerImage?.color || "#000000"}00), url(${getLargestImage(artistInfo?.visuals.headerImage?.images)?.url || getLargestImage(artist.images)?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="flex w-full items-end justify-between">
                    <div>
                        <h1 className="text-7xl font-bold drop-shadow-lg">
                            {artist.name}
                        </h1>
                        <div className="mt-4 flex gap-3 text-xl capitalize">
                            {limitArray(artist.genres, 3).map((genre) => (
                                <Badge key={genre}>{genre}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Link href={`/app/artist/${artist.id}`}>
                            <Button className="flex items-center gap-3 rounded-full">
                                Explore Tracks <ArrowRight size={22} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            {artistInfo?.visuals.headerImage?.color && (
                <div
                    className="pointer-events-none absolute z-0 h-[300px] w-full"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${artistInfo.visuals.headerImage.color}75, transparent)`,
                    }}
                ></div>
            )}
        </>
    )
}
