import ArtistHero from "@/components/Artist/ArtistHero"
import getExtraArtistInfo from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import InLineError from "../Misc/InLineError"
import { Suspense } from "react"
import SpinnerSkeleton from "../Misc/SpinnerSkeleton"
import TrackTableSkeleton from "../Track/TracklTableSkeleton"
import getExtractedColors from "@/lib/Spotify/GetExtractedColors"
import UserHero from "./UserHero"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import TrackCarouselLoader from "../Track/TrackCarouselLoader"
import PlaylistCarousel from "../Playlist/PlaylistCarousel"
import Playlist from "../Playlist/Playlist"

export default async function UserProfile({ userId }: { userId: string }) {
    try {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const [user, playlists] = await Promise.all([
            spotify.users.profile(userId),
            spotify.playlists.getUsersPlaylists(userId, 50),
        ])
        const colors =
            user.images.length > 0
                ? await getExtractedColors([getLargestImage(user.images)?.url])
                : [
                      {
                          colorDark: "#0f172a",
                          colorLight: "#334155",
                          color: "#1e293b",
                      },
                  ]

        return (
            <div className="flex flex-col gap-10">
                <div>
                    <UserHero user={user} color={colors[0]} />
                </div>
                <div className="px-5">
                    <h1 className="mb-3 text-2xl opacity-75">Playlists</h1>
                    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {playlists.items
                            .filter((p) => p)
                            .map((playlist, i) => (
                                <Playlist playlist={playlist} key={i} />
                            ))}
                    </div>
                </div>
            </div>
        )
    } catch (e) {
        console.error(e)
        return <InLineError error={<>Unable to load user</>} />
    }
}
