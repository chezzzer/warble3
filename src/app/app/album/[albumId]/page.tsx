import { Suspense } from "react"
import { AlbumProfile } from "@/components/Album/AlbumProfile"
import AlbumLoader from "@/components/Album/AlbumLoader"

export default async function ArtistPage(
    props: {
        params: Promise<{ albumId: string }>
    }
) {
    const params = await props.params;
    return (
        <>
            <Suspense fallback={<AlbumLoader />}>
                <AlbumProfile albumId={params.albumId} />
            </Suspense>
        </>
    )
}
