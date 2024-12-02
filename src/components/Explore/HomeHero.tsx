import { Badge } from "../ui/badge"
import { formatNumber, limitArray } from "@/lib/utils"
import { Button } from "../ui/button"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { cache } from "react"
import { api } from "@/trpc/server"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import getExtraArtistInfo, {
    ArtistInfo,
} from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { Artist } from "@spotify/web-api-ts-sdk"
import { unstable_cache } from "next/cache"
import { readFile, writeFile } from "fs/promises"
import Link from "next/link"
import { extractUri, getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import {
    getPopularArtists,
    getRandomPopularArtist,
} from "@/lib/Spotify/SpotifyPopularArtists"

const getArtistCache = unstable_cache(
    async () => {
        return await getRandomPopularArtist()
    },
    ["artistCache"],
    { tags: ["artistCache"] }
)

const getArtistInfoCache = unstable_cache(
    async (id: string) => {
        return await getExtraArtistInfo(id)
    },
    ["artistInfoCache"],
    { tags: ["artistInfoCache"] }
)

export default async function HomeHero() {
    const artist = await getArtistCache()
    const artistInfo = await getArtistInfoCache(extractUri(artist.uri).id)

    if (!artist) {
        return <div>&nbsp;</div>
    }

    return (
        <>
            <div
                className="dark relative flex h-[300px] flex-col justify-end p-10 text-white"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${artistInfo?.visuals.headerImage?.color || "#000000"}, ${artistInfo?.visuals.headerImage?.color || "#000000"}00), url(${getLargestImage(artistInfo?.visuals.headerImage?.images)?.url || getLargestImage(artist.visuals.avatarImage.sources)?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="flex w-full items-end justify-between">
                    <div>
                        <h1 className="text-7xl font-bold drop-shadow-lg">
                            {artist.profile.name}
                        </h1>
                        <div className="mt-4 text-xl">
                            {formatNumber(artistInfo.stats.monthlyListeners)}{" "}
                            Monthly Listeners
                        </div>
                    </div>
                    <div>
                        <Link href={`/app/artist/${extractUri(artist.uri).id}`}>
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
