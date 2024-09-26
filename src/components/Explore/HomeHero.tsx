"use client"

import { Badge } from "../ui/badge"
import { limitArray } from "@/lib/utils"
import { Button } from "../ui/button"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { cache } from "react"
import { api } from "@/trpc/react"
import HomeHeroLoader from "./HomeHeroLoader"

export default function HomeHero() {
    const { isPending, data } = api.spotify.getHomeArtist.useQuery()

    if (isPending || !data) {
        return <HomeHeroLoader />
    }

    const artist = data

    return (
        <>
            <div
                className="relative flex h-[300px] items-end p-10"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${artist.visuals?.headerImage?.extractedColors.colorRaw.hex || "#000000"}, ${artist.visuals?.headerImage?.extractedColors.colorRaw.hex || "#000000"}00), url(${artist.visuals?.headerImage?.sources[0]?.url || artist.images[0]?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="flex w-full items-end justify-between">
                    <div>
                        <h1 className="text-7xl font-bold drop-shadow-lg">
                            {artist.name}
                        </h1>
                        <div className="mt-4 flex gap-3 text-xl capitalize">
                            {limitArray(artist.genres, 3).map((genre) => (
                                <Badge key={genre}>{genre}</Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Button className="flex items-center gap-3 rounded-full">
                            Explore Tracks <ArrowRight size={22} />
                        </Button>
                    </div>
                </div>
            </div>
            {artist.visuals?.headerImage?.extractedColors.colorRaw.hex && (
                <div
                    className="absolute z-0 h-[300px] w-full"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${artist.visuals.headerImage.extractedColors.colorRaw.hex}75, transparent)`,
                    }}
                ></div>
            )}
        </>
    )
}

