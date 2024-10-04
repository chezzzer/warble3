import { Badge } from "../ui/badge"
import { limitArray } from "@/lib/utils"
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
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"

async function getHomeArtist() {
    try {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const homeTracks = await spotify.recommendations.get({
            seed_genres: ["pop", "rock-n-roll", "britpop"],
            seed_artists: ["3yY2gUcIsjMr8hjo51PoJ8"],
            limit: 1,
        })

        const id = homeTracks.tracks[0]?.artists[0]?.id!

        if (!id) {
            throw new Error("No valid tracks found")
        }

        const [artist, artistInfo] = await Promise.all([
            spotify.artists.get(id),
            getExtraArtistInfo(id),
        ])

        return [artist, artistInfo] as [Artist, ArtistInfo | null]
    } catch (e) {
        console.error("Error with fetching home artist", e)
        return null
    }
}

const getHomeArtistCache = unstable_cache(
    async () => {
        return await getHomeArtist()
    },
    ["homeArtist"],
    { revalidate: 120, tags: ["homeArtist"] }
)

export default async function HomeHero() {
    const [artist, artistInfo] = await getHomeArtistCache()

    return (
        <>
            <div
                className="relative flex h-[300px] flex-col justify-end p-10"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${artistInfo?.visuals.headerImage.color || "#000000"}, ${artistInfo?.visuals.headerImage.color || "#000000"}00), url(${getLargestImage(artistInfo?.visuals.headerImage?.images)?.url || getLargestImage(artist.images)?.url})`,
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
                        <Link href={`/artist/${artist.id}`}>
                            <Button className="flex items-center gap-3 rounded-full">
                                Explore Tracks <ArrowRight size={22} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            {artistInfo?.visuals.headerImage.color && (
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
