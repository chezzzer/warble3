import ArtistHero from "@/components/Artist/ArtistHero"
import getExtraArtistInfo from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import ArtistTopTracks from "./ArtistTopTracks"
import ArtistPinnedItem from "./ArtistPinnedItem"
import ArtistBio from "./ArtistBio"
import ArtistGallery from "./ArtistGallery"
import ArtistStats from "./ArtistStats"
import ArtistAlbums from "./ArtistAlbums"
import ArtistPopularAlbums from "./ArtistPopularAlbums"
import InLineError from "../Misc/InLineError"
import { Suspense } from "react"
import SpinnerSkeleton from "../Misc/SpinnerSkeleton"
import TrackTableSkeleton from "../Track/Loaders/TrackTableSkeleton"

export default async function ArtistProfile({
    artistId,
}: {
    artistId: string
}) {
    try {
        const spotify = await SpotifyProvider.makeFromDatabaseCache()

        const [
            artist,
            artistInfo,
            albums,
            // relatedArtists,
            // similarTracks,
        ] = await Promise.all([
            spotify.artists.get(artistId),
            getExtraArtistInfo(artistId),
            spotify.artists.albums(
                artistId,
                "album,single,appears_on,compilation"
            ),
            // spotify.artists.relatedArtists(artistId),
            // spotify.recommendations.get({
            //     seed_artists: [artistId],
            //     limit: 20,
            // }),
        ])

        return (
            <div className="flex flex-col gap-10">
                <div>
                    <ArtistHero artist={artist} artistInfo={artistInfo} />
                </div>
                <div className="flex flex-col gap-10 px-5 md:flex-row">
                    <div className="flex-1">
                        <h1 className="mb-3 text-2xl opacity-75">Top Tracks</h1>
                        <Suspense fallback={<TrackTableSkeleton />}>
                            <ArtistTopTracks
                                topTracks={artistInfo.discography.topTracks}
                            />
                        </Suspense>
                    </div>
                    <div className="relative md:w-[400px]">
                        <div className="flex flex-col gap-5">
                            {artistInfo?.profile?.pinnedItem && (
                                <ArtistPinnedItem
                                    item={artistInfo.profile.pinnedItem}
                                />
                            )}
                            {artistInfo?.stats && (
                                <ArtistStats stats={artistInfo.stats} />
                            )}
                            {artistInfo?.visuals?.gallery.length > 0 && (
                                <ArtistGallery
                                    images={artistInfo.visuals.gallery}
                                />
                            )}
                            {artistInfo?.profile?.biography && (
                                <ArtistBio bio={artistInfo.profile.biography} />
                            )}
                        </div>
                    </div>
                </div>
                {artistInfo && (
                    <div>
                        <ArtistPopularAlbums
                            albums={artistInfo.discography.popularReleases}
                        />
                    </div>
                )}
                {albums.items.length > 0 && (
                    <div>
                        <ArtistAlbums albums={albums.items} />
                    </div>
                )}
                <div>
                    {/* <ArtistRelatedArtists artists={relatedArtists.artists} /> */}
                </div>
                <div>
                    {/* <ArtistSimilarTracks tracks={similarTracks.tracks} /> */}
                </div>
            </div>
        )
    } catch (e) {
        return <InLineError error={<>Unable to load artist</>} />
    }
}
