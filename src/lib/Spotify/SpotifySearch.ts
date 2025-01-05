import {
    Album,
    Artist,
    Image,
    Playlist,
    SimplifiedAlbum,
    SimplifiedArtist,
    SimplifiedPlaylist,
    SimplifiedTrack,
    Track,
    User,
} from "@spotify/web-api-ts-sdk"
import { getAccessToken } from "./SpotifyPublicAuthentication"
import { extractUri } from "./SpotifyUtils"

export async function search(searchTerm: string, limit: number = 20) {
    const accessToken = await getAccessToken()

    const releases = await fetch(
        "https://api-partner.spotify.com/pathfinder/v1/query?" +
            new URLSearchParams({
                operationName: "searchDesktop",
                variables: JSON.stringify({
                    searchTerm: searchTerm,
                    offset: 0,
                    limit: limit,
                    numberOfTopResults: 5,
                    includeAudiobooks: false,
                    includeArtistHasConcertsField: false,
                    includePreReleases: false,
                    includeLocalConcertsField: false,
                }),
                extensions: JSON.stringify({
                    persistedQuery: {
                        version: 1,
                        sha256Hash:
                            "a9c1e5aa0a72970b3655e3b0a9e5f4b9932c2fc5f64ea425992abde0209ee09a",
                    },
                }),
            }),
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: {
                revalidate: 3600,
            },
        }
    )

    const data = await releases.json()

    const search = data.data.searchV2

    return {
        tracks: search.tracksV2?.items
            .map((i) => i.item.data)
            .filter((t) => t.uri)
            .map(
                (t) =>
                    ({
                        name: t.name,
                        uri: t.uri,
                        is_playable: t.playability.playable,
                        duration_ms: t.duration.totalMilliseconds,
                        id: t.id,
                        explicit: t.contentRating === "EXPLICIT",
                        album: {
                            id: t.albumOfTrack.id,
                            uri: t.albumOfTrack.uri,
                            name: t.albumOfTrack.name,
                            images: t.albumOfTrack.coverArt?.sources ?? [],
                        },
                        artists: t.artists?.items.map(
                            (a) =>
                                ({
                                    id: extractUri(a.uri).id,
                                    name: a.profile.name,
                                    uri: a.uri,
                                }) as SimplifiedArtist
                        ),
                    }) as Track
            ),
        artists: search.artists?.items
            .map((i) => i.data)
            .filter((t) => t.uri)
            .map(
                (a) =>
                    ({
                        id: extractUri(a.uri).id,
                        name: a.profile.name,
                        uri: a.uri,
                        images: a.visuals.avatarImage?.sources ?? [],
                    }) as Artist
            ),
        albums: search.albumsV2?.items
            .map((i) => i.data)
            .filter((a) => a.__typename !== "PreRelease")
            .filter((t) => t.uri)
            .map(
                (a) =>
                    ({
                        uri: a.uri,
                        id: extractUri(a.uri).id,
                        name: a.name,
                        release_date: a.date?.year,
                        images: a.coverArt?.sources ?? [],
                        artists: a.artists?.items.map(
                            (a) =>
                                ({
                                    id: extractUri(a.uri).id,
                                    name: a.profile.name,
                                    uri: a.uri,
                                }) as SimplifiedArtist
                        ),
                    }) as Album
            ),
        playlists: search.playlists?.items
            .map((i) => i.data)
            .filter((t) => t.uri)
            .map(
                (p) =>
                    ({
                        description: p.description,
                        id: extractUri(p.uri).id,
                        name: p.name,
                        uri: p.uri,
                        owner: {
                            display_name: p.ownerV2.data.name,
                            uri: p.ownerV2.data.uri,
                            id: extractUri(p.ownerV2.data.uri).id,
                        },
                        images: p.images?.items[0].sources,
                    }) as Playlist
            )
            .filter((p) => p.owner.id !== "spotify"),
        users: search.users?.items
            .map((i) => i.data)
            .filter((t) => t.uri)
            .map(
                (u) =>
                    ({
                        display_name: u.displayName,
                        id: u.id,
                        images: u.avatar?.sources ?? [],
                        uri: u.uri,
                    }) as User
            ) as User[],
        top: getTopResult(
            search.topResultsV2?.itemsV2
                .map((i) => i.item.data)
                .filter((i) =>
                    ["Track", "Artist", "Album", "Playlist", "User"].includes(
                        i.__typename
                    )
                )[0]
        ),
    } as SearchResponse
}

function getTopResult(search: any): Track | Artist | Album | Playlist | User {
    if (extractUri(search.uri).type === "track") {
        const t = search
        return {
            name: t.name,
            uri: t.uri,
            is_playable: t.playability.playable,
            duration_ms: t.duration.totalMilliseconds,
            id: t.id,
            explicit: t.contentRating === "EXPLICIT",
            album: {
                id: t.albumOfTrack.id,
                uri: t.albumOfTrack.uri,
                name: t.albumOfTrack.name,
                images: t.albumOfTrack.coverArt?.sources ?? [],
            },
            artists: t.artists.items.map(
                (a) =>
                    ({
                        id: extractUri(a.uri).id,
                        name: a.profile.name,
                        uri: a.uri,
                    }) as SimplifiedArtist
            ),
        } as Track
    }
    if (extractUri(search.uri).type === "artist") {
        const a = search
        return {
            id: extractUri(a.uri).id,
            name: a.profile.name,
            uri: a.uri,
            images: a.visuals.avatarImage?.sources ?? [],
        } as Artist
    }
    if (extractUri(search.uri).type === "album") {
        const a = search
        return {
            uri: a.uri,
            id: extractUri(a.uri).id,
            name: a.name,
            release_date: a.date?.year,
            images: a.coverArt?.sources ?? [],
            artists: a.artists?.items.map(
                (a) =>
                    ({
                        id: extractUri(a.uri).id,
                        name: a.profile.name,
                        uri: a.uri,
                    }) as SimplifiedArtist
            ),
        } as Album
    }
    if (extractUri(search.uri).type === "playlist") {
        const p = search
        return {
            description: p.description,
            id: extractUri(p.uri).id,
            name: p.name,
            uri: p.uri,
            owner: {
                display_name: p.ownerV2.data.name,
                uri: p.ownerV2.data.uri,
                id: extractUri(p.ownerV2.data.uri).id,
            },
            images: p.images?.items[0].sources,
        } as Playlist
    }
    if (extractUri(search.uri).type === "user") {
        const u = search
        return {
            display_name: u.displayName,
            id: u.id,
            images: u.avatar?.sources ?? [],
            uri: u.uri,
        } as User
    }
}

type SearchResponse = {
    top: Track | Artist | Album | Playlist | User
    albums: Album[]
    artists: Artist[]
    tracks: Track[]
    playlists: Playlist[]
    users: User[]
}
