"use client"

import HomeHeroLoader from "@/components/Explore/HomeHeroLoader"
import SearchHero from "@/components/Search/SearchHero"
import SearchResults from "@/components/Search/SearchResults"
import { Suspense } from "react"

export default function Search() {
    return (
        <>
            <SearchHero />
            <SearchResults />
        </>
    )
}
