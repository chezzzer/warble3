import ArtistProfile from "@/components/Artist/ArtistProfile"
import ArtistHero from "@/components/Artist/ArtistHero"
import ArtistLoader from "@/components/Artist/ArtistLoader"
import getExtraArtistInfo from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { Suspense } from "react"

export default async function ArtistPage({
    params,
}: {
    params: { artistId: string }
}) {
    return (
        <>
            <Suspense fallback={<ArtistLoader />}>
                <ArtistProfile artistId={params.artistId} />
            </Suspense>
        </>
    )
}
