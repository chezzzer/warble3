"use client"

import { ArtistInfo } from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { SpotifyProvider } from "@/lib/Spotify/SpotifyProvider"
import { formatNumber, limitArray } from "@/lib/utils"
import { Artist } from "@spotify/web-api-ts-sdk"
import { Badge } from "../ui/badge"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"

export default function ArtistHero({
    artist,
    artistInfo,
}: {
    artist: Artist
    artistInfo: ArtistInfo
}) {
    return (
        <>
            <div
                className="dark relative flex h-[400px] flex-col justify-end p-10 text-white"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${artistInfo.visuals.headerImage?.color || "#000000"}, ${artistInfo.visuals.headerImage?.color || "#000000"}00), url(${getLargestImage(artistInfo.visuals.headerImage?.images)?.url || getLargestImage(artist.images)?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="flex w-full items-end justify-between">
                    <div className="flex items-end gap-10">
                        <div>
                            <img
                                src={getLargestImage(artist.images)?.url}
                                className="aspect-square rounded-full object-cover drop-shadow-2xl"
                                width={150}
                                height={150}
                                alt={artist.name}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-7xl font-bold drop-shadow-lg">
                                {artist.name}
                            </h1>
                            <div className="flex gap-3 text-xl capitalize">
                                {limitArray(artist.genres, 3).map((genre) => (
                                    <Badge key={genre}>{genre}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {artistInfo.visuals.headerImage?.color && (
                <div
                    className="pointer-events-none absolute z-0 h-[300px] w-full"
                    style={{
                        backgroundImage: `linear-gradient(to bottom, ${artistInfo.visuals.headerImage.color}75, transparent)`,
                    }}
                ></div>
            )}
        </>
    )
}
