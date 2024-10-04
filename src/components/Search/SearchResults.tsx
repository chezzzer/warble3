"use client"

import {
    Artist,
    Category,
    Playlist,
    SimplifiedAlbum,
    Track,
} from "@spotify/web-api-ts-sdk"
import SearchCategories from "./SearchCategories"
import { useSearch } from "@/lib/Context/SearchContext"
import SpinnerSkeleton from "../Misc/SpinnerSkeleton"
import AlbumCarousel from "../Album/AlbumCarousel"
import TrackCarousel from "../Track/TrackCarousel"
import ArtistCarousel from "../Artist/ArtistCarousel"
import PlaylistCarousel from "../Playlist/PlaylistCarousel"

export default function SearchResults({
    categories,
}: {
    categories: Category[]
}) {
    const { items, isLoading } = useSearch()

    if (isLoading) {
        return <SpinnerSkeleton />
    }

    if (!items) {
        return (
            <div className="p-5">
                <SearchCategories categories={categories} />
            </div>
        )
    }

    return (
        <>
            {items.tracks.length && (
                <>
                    <h1 className="mb-3 mt-10 px-5 text-2xl opacity-75">
                        Tracks
                    </h1>
                    <TrackCarousel tracks={items.tracks as Track[]} />
                </>
            )}
            {items.albums.length && (
                <>
                    <h1 className="mb-3 mt-10 px-5 text-2xl opacity-75">
                        Albums
                    </h1>
                    <AlbumCarousel albums={items.albums as SimplifiedAlbum[]} />
                </>
            )}
            {items.artists.length && (
                <>
                    <h1 className="mb-3 mt-10 px-5 text-2xl opacity-75">
                        Artists
                    </h1>
                    <ArtistCarousel artists={items.artists as Artist[]} />
                </>
            )}
            {items.playlists.length && (
                <>
                    <h1 className="mb-3 mt-10 px-5 text-2xl opacity-75">
                        Playlists
                    </h1>
                    <PlaylistCarousel
                        playlists={items.playlists as Playlist[]}
                    />
                </>
            )}
        </>
    )
}
