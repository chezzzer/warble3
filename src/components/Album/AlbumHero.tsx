"use client"

import { ExtractedColor } from "@/lib/Spotify/GetExtractedColors"
import { formatNumber } from "@/lib/utils"
import { Circle } from "@phosphor-icons/react"
import { Album } from "@spotify/web-api-ts-sdk"
import Link from "next/link"
import { Badge } from "../ui/badge"

export default function AlbumHero({
    album,
    color,
}: {
    album: Album
    color: ExtractedColor
}) {
    return (
        <>
            <div
                className="relative flex h-[300px] flex-col justify-end p-10"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${color.colorDark}, ${color.colorLight})`,
                }}
            >
                <div className="flex w-full items-end justify-between">
                    <div className="flex items-end gap-10">
                        <div>
                            <img
                                src={album.images[0].url}
                                className="aspect-square rounded-full object-cover drop-shadow-2xl"
                                width={150}
                                height={150}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-7xl font-bold drop-shadow-lg">
                                {album.name}
                            </h1>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-2">
                                    <Badge className="capitalize">
                                        {album.album_type}
                                    </Badge>
                                    <Circle size={6} weight="fill" />
                                    {album.artists.map((a, i) => (
                                        <>
                                            <Link
                                                key={a.id}
                                                href={`/artist/${a.id}`}
                                                className="underline underline-offset-2"
                                            >
                                                {a.name}
                                                {i !==
                                                    album.artists.length - 1 &&
                                                    ","}
                                            </Link>{" "}
                                        </>
                                    ))}
                                    <Circle
                                        className="opacity-75"
                                        size={6}
                                        weight="fill"
                                    />
                                    <div className="opacity-75">
                                        {new Date(
                                            album.release_date
                                        ).getFullYear()}
                                    </div>
                                    <Circle
                                        className="opacity-75"
                                        size={6}
                                        weight="fill"
                                    />
                                    <div className="opacity-75">
                                        {formatNumber(album.total_tracks)}
                                        {" Tracks"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="pointer-events-none absolute z-0 h-[300px] w-full"
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${color.color}75, transparent)`,
                }}
            ></div>
        </>
    )
}