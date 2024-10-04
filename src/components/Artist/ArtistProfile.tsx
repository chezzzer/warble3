import ArtistHero from "@/components/Artist/ArtistHero"
import getExtraArtistInfo from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { Market } from "@spotify/web-api-ts-sdk"
import ArtistTopTracks from "./ArtistTopTracks"
import ArtistPinnedItem from "./ArtistPinnedItem"
import { replaceSpotifyUriLinks } from "@/lib/Spotify/SpotifyUtils"
import { ScrollArea } from "../ui/scroll-area"
import ArtistBio from "./ArtistBio"
import ArtistGallery from "./ArtistGallery"
import ArtistStats from "./ArtistStats"
import { writeFile } from "fs/promises"
import ArtistAlbums from "./ArtistAlbums"
import ArtistPopularAlbums from "./ArtistPopularAlbums"
import ArtistSimilarTracks from "./ArtistSimilarTracks"
import ArtistRelatedArtists from "./ArtistRelatedArtists"

export default async function ArtistPage({ artistId }: { artistId: string }) {
    const spotify = await SpotifyProvider.makeFromDatabaseCache()

    const [
        artist,
        artistInfo,
        topTracks,
        albums,
        relatedArtists,
        similarTracks,
    ] = await Promise.all([
        spotify.artists.get(artistId),
        getExtraArtistInfo(artistId),
        spotify.artists.topTracks(artistId, "NZ"),
        spotify.artists.albums(artistId, "album,single,appears_on,compilation"),
        spotify.artists.relatedArtists(artistId),
        spotify.recommendations.get({
            seed_artists: [artistId],
            limit: 20,
        }),
    ])

    return (
        <div className="flex flex-col gap-10">
            <div>
                <ArtistHero artist={artist} artistInfo={artistInfo} />
            </div>
            <div className="flex gap-10 px-5">
                <div className="flex-1">
                    <ArtistTopTracks tracks={topTracks.tracks} />
                </div>
                <div className="relative w-[400px]">
                    <div className="flex flex-col gap-5">
                        {artistInfo.profile.pinnedItem && (
                            <ArtistPinnedItem
                                item={artistInfo.profile.pinnedItem}
                            />
                        )}
                        {artistInfo.stats && (
                            <ArtistStats stats={artistInfo.stats} />
                        )}
                        {artistInfo.visuals.gallery.length > 0 && (
                            <ArtistGallery
                                images={artistInfo.visuals.gallery}
                            />
                        )}
                        {artistInfo.profile.biography && (
                            <ArtistBio bio={artistInfo.profile.biography} />
                        )}
                    </div>
                </div>
            </div>
            <div>
                <ArtistPopularAlbums
                    albums={artistInfo.discography.popularReleases}
                />
            </div>
            <div>
                <ArtistAlbums albums={albums.items} />
            </div>
            <div>
                <ArtistRelatedArtists artists={relatedArtists.artists} />
            </div>
            <div>
                <ArtistSimilarTracks tracks={similarTracks.tracks} />
            </div>
        </div>
    )
}
