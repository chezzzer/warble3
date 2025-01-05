"use client"

import {
    Artist,
    Category,
    Playlist,
    SimplifiedAlbum,
    Track,
    User,
} from "@spotify/web-api-ts-sdk"
import { useSearch } from "@/lib/Context/SearchContext"
import SpinnerSkeleton from "../Misc/SpinnerSkeleton"
import AlbumCarousel from "../Album/AlbumCarousel"
import TrackCarousel from "../Track/TrackCarousel"
import ArtistCarousel from "../Artist/ArtistCarousel"
import PlaylistCarousel from "../Playlist/PlaylistCarousel"
import UserCarousel from "../User/UserCarousel"
import TrackTable from "../Track/TrackTable"
import { limitArray } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "../ui/card"
import SearchTopResult from "./SearchTopResult"

export default function SearchResults() {
    const { items, isLoading } = useSearch()

    if (isLoading) {
        return <SpinnerSkeleton />
    }

    if (!items) {
        return <div className="h-[400px]"></div>
    }

    return (
        <>
            <div className="mb-3 mt-10 grid grid-cols-9 gap-5 px-5">
                {items.top && (
                    <div className="col-span-2">
                        <SearchTopResult result={items.top as any} />
                    </div>
                )}
                {items.tracks.length && (
                    <div className="col-span-7">
                        <Card>
                            <CardHeader>
                                <h1 className="text-2xl opacity-75">Tracks</h1>
                            </CardHeader>
                            <CardContent>
                                <TrackTable
                                    tracks={
                                        limitArray(items.tracks, 5) as Track[]
                                    }
                                />
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
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
                        playlists={
                            items.playlists.filter((p) => p) as Playlist[]
                        }
                    />
                </>
            )}

            {items.users.length && (
                <>
                    <h1 className="mb-3 mt-10 px-5 text-2xl opacity-75">
                        Users
                    </h1>
                    <UserCarousel users={items.users as User[]} />
                </>
            )}
        </>
    )
}
