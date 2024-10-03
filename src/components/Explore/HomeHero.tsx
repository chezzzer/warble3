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

async function cuntbag() {
    const file = await readFile("cuntbag.txt", "utf8")
    const number = parseInt(file)
    await writeFile("cuntbag.txt", (number + 1).toString())
}

async function getHomeArtist() {
    try {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        cuntbag()
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

        return {
            ...artist,
            ...artistInfo,
        } as Artist & ArtistInfo
    } catch (e) {
        console.error(e)
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
    const artist = await getHomeArtistCache()

    if (!artist) {
        return null
    }

    return (
        <>
            <div
                className="relative flex h-[300px] flex-col justify-end p-10"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${artist.visuals?.headerImage?.extractedColors.colorRaw.hex || "#000000"}, ${artist.visuals?.headerImage?.extractedColors.colorRaw.hex || "#000000"}00), url(${artist.visuals?.headerImage?.sources[0]?.url || artist.images[0]?.url})`,
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
                        <Button className="flex items-center gap-3 rounded-full">
                            Explore Tracks <ArrowRight size={22} />
                        </Button>
                    </div>
                </div>
            </div>
            {artist.visuals?.headerImage?.extractedColors.colorRaw.hex && (
                <div
                    className="pointer-events-none absolute z-0 h-[300px] w-full"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${artist.visuals.headerImage.extractedColors.colorRaw.hex}75, transparent)`,
                    }}
                ></div>
            )}
        </>
    )
}

