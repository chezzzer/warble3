import { Track } from "@spotify/web-api-ts-sdk"
import TrackTable from "../Track/TrackTable"
import { ArtistTopTrack } from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"

export default async function ArtistTopTracks({
    topTracks,
}: {
    topTracks: ArtistTopTrack[]
}) {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()
    const tracks = await spotify.tracks.get(topTracks.map((t) => t.id))
    const playcounts = topTracks.map((t) => t.playcount)

    return (
        <>
            <TrackTable tracks={tracks} playcounts={playcounts} />
        </>
    )
}
