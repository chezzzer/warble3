import PlaylistLoader from "@/components/Playlist/PlaylistLoader"
import { PlaylistProfile } from "@/components/Playlist/PlaylistProfile"
import { Suspense } from "react"

export default async function PlaylistPage(
    props: {
        params: Promise<{ playlistId: string }>
    }
) {
    const params = await props.params;
    return (
        <>
            <Suspense fallback={<PlaylistLoader />}>
                <PlaylistProfile playlistId={params.playlistId} />
            </Suspense>
        </>
    )
}
