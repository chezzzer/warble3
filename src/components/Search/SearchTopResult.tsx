import { extractUri } from "@/lib/Spotify/SpotifyUtils"
import type {
    Track as SpotifyTrack,
    Artist as SpotifyArtist,
    Album as SpotifyAlbum,
    Playlist as SpotifyPlaylist,
    User as SpotifyUser,
} from "@spotify/web-api-ts-sdk"
import Track from "../Track/Track"
import Artist from "../Artist/Artist"
import Album from "../Album/Album"
import Playlist from "../Playlist/Playlist"
import User from "../User/User"

export default function SearchTopResult({
    result,
}: {
    result:
        | SpotifyTrack
        | SpotifyArtist
        | SpotifyAlbum
        | SpotifyPlaylist
        | SpotifyUser
}) {
    const type = extractUri(result.uri).type

    if (type === "track") {
        return <Track track={result as SpotifyTrack} />
    }

    if (type === "artist") {
        return <Artist artist={result as SpotifyArtist} />
    }

    if (type === "album") {
        return <Album album={result as SpotifyAlbum} />
    }

    if (type === "playlist") {
        return <Playlist playlist={result as SpotifyPlaylist} />
    }

    if (type === "user") {
        return <User user={result as SpotifyUser} />
    }
}
