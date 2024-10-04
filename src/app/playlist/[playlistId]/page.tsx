import PlaylistLoader from "@/components/Playlist/PlaylistLoader"
import { PlaylistProfile } from "@/components/Playlist/PlaylistProfile"
import { Suspense } from "react"

export default async function PlaylistPage({
    params,
}: {
    params: { playlistId: string }
}) {
    return (
        <>
            <Suspense fallback={<PlaylistLoader />}>
                <PlaylistProfile playlistId={params.playlistId} />
            </Suspense>
        </>
    )
}
