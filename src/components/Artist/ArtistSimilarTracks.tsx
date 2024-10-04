import TrackCarousel from "../Track/TrackCarousel"
import { shuffleArray } from "@/lib/utils"
import { Track } from "@spotify/web-api-ts-sdk"

export default function ArtistSimilarTracks({ tracks }: { tracks: Track[] }) {
    return (
        <>
            <h1 className="mb-3 px-5 text-2xl opacity-75">More like this</h1>
            <TrackCarousel tracks={shuffleArray(tracks)} />
        </>
    )
}
