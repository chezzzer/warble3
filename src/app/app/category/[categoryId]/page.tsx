import { Suspense } from "react"
import { AlbumProfile } from "@/components/Album/AlbumProfile"
import AlbumLoader from "@/components/Album/AlbumLoader"
import { CategoryProfile } from "@/components/Category/CategoryProfile"
import CategoryLoader from "@/components/Category/CategoryLoader"

export default async function CategoryPage({
    params,
}: {
    params: { categoryId: string }
}) {
    return (
        <>
            <Suspense fallback={<CategoryLoader />}>
                <CategoryProfile categoryId={params.categoryId} />
            </Suspense>
        </>
    )
}
