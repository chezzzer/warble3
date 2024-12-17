import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { unstable_cache } from "next/cache"
import { readFile, writeFile } from "fs/promises"
import TrackCarousel from "../Track/TrackCarousel"
import InLineError from "../Misc/InLineError"

async function getRecommendations() {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    return await spotify.recommendations.get({
        seed_genres: ["pop", "rock-n-roll", "britpop"],
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
    try {
        const recommendations = await getRecommendationsCache()

        return (
            <>
                <h1 className="mb-3 mt-10 px-5 text-2xl">Recommended</h1>
                <TrackCarousel tracks={recommendations.tracks} />
            </>
        )
    } catch (e) {
        console.error(e)
        return <InLineError error={<>Unable to load recommendations</>} />
    }
}
