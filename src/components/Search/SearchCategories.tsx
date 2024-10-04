"use client"

import type { Category as SpotifyCategory } from "@spotify/web-api-ts-sdk"
import Category from "../Category/Category"

export default function SearchCategories({
    categories,
}: {
    categories: SpotifyCategory[]
}) {
    return (
        <>
            <h1 className="mb-3 mt-10 text-2xl opacity-75">Categories</h1>
            <div className="grid grid-cols-6 gap-5">
                {categories.map((category) => (
                    <Category key={category.id} category={category} />
                ))}
            </div>
        </>
    )
}
