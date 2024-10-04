import { Suspense } from "react"
import { AlbumProfile } from "@/components/Album/AlbumProfile"
import AlbumLoader from "@/components/Album/AlbumLoader"

export default async function ArtistPage({
    params,
}: {
    params: { albumId: string }
}) {
    return (
        <>
            <Suspense fallback={<AlbumLoader />}>
                <AlbumProfile albumId={params.albumId} />
            </Suspense>
        </>
    )
}
