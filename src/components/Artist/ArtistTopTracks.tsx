import { Track } from "@spotify/web-api-ts-sdk"
import TrackTable from "../Track/TrackTable"

export default function ArtistTopTracks({ tracks }: { tracks: Track[] }) {
    return (
        <>
            <h1 className="mb-3 text-2xl opacity-75">Top Tracks</h1>
            <TrackTable tracks={tracks} />
        </>
    )
}
