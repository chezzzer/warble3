import Link from "next/link"

import { api, HydrateClient } from "@/trpc/server"
import HomeHero from "@/components/Explore/HomeHero"
import { Suspense } from "react"
import HomeHeroLoader from "@/components/Explore/HomeHeroLoader"

export default async function Home() {
    return (
        <HydrateClient>
            <Suspense>
                <HomeHero />
            </Suspense>
        </HydrateClient>
    )
}

