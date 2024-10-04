"use client"

import { ExtractedColor } from "@/lib/Spotify/GetExtractedColors"
import {
    getLargestImage,
    replaceSpotifyUriLinks,
} from "@/lib/Spotify/SpotifyUtils"
import { formatNumber } from "@/lib/utils"
import { Playlist } from "@spotify/web-api-ts-sdk"
import { decode } from "html-entities"

export default function PlaylistHero({
    playlist,
    color,
}: {
    playlist: Playlist
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
                                alt={playlist.name}
                                src={getLargestImage(playlist.images).url}
                                className="aspect-square rounded-lg object-cover drop-shadow-2xl"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-7xl font-bold drop-shadow-lg">
                                {playlist.name}
                            </h1>
                            <div
                                className="text-sm text-gray-300 [&>a]:text-white [&>a]:underline"
                                dangerouslySetInnerHTML={{
                                    __html: replaceSpotifyUriLinks(
                                        playlist.description
                                    ),
                                }}
                            />
                            <div className="flex gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="opacity-75">
                                        {formatNumber(playlist.tracks.total)}
                                        {" Tracks"} &middot;{" "}
                                        {playlist.owner.display_name}
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
