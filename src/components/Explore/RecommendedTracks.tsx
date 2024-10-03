import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { unstable_cache } from "next/cache"
import Track from "../Track/Track"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel"
import { readFile, writeFile } from "fs/promises"
import TrackCarousel from "../Track/TrackCarousel"

async function cuntbag() {
    const file = await readFile("cuntbag.txt", "utf8")
    const number = parseInt(file)
    await writeFile("cuntbag.txt", (number + 1).toString())
}

async function getRecommendations() {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    cuntbag()
    return await spotify.recommendations.get({
        seed_genres: ["pop", "rock-n-roll", "britpop"],
        seed_artists: ["3yY2gUcIsjMr8hjo51PoJ8"],
        limit: 50,
    })
}

const getRecommendationsCache = unstable_cache(
    async () => {
        return await getRecommendations()
    },
    ["homeRecommendations"],
    { revalidate: 120, tags: ["homeRecommendations"] }
)

export default async function RecommendedTracks() {
    const recommendations = await getRecommendationsCache()

    return (
        <>
            <h1 className="mb-3 mt-10 px-5 text-2xl">Recommended</h1>
            <TrackCarousel tracks={recommendations.tracks} />
        </>
    )
}

