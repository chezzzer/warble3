import ArtistProfile from "@/components/Artist/ArtistProfile"
import ArtistHero from "@/components/Artist/ArtistHero"
import ArtistLoader from "@/components/Artist/ArtistLoader"
import getExtraArtistInfo from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { Suspense } from "react"
import UserProfile from "@/components/User/UserProfile"
import PlaylistLoader from "@/components/Playlist/PlaylistLoader"
import UserLoader from "@/components/User/UserLoader"

export default async function ArtistPage({
    params,
}: {
    params: { userId: string }
}) {
    return (
        <>
            <Suspense fallback={<UserLoader />}>
                <UserProfile userId={params.userId} />
            </Suspense>
        </>
    )
}
