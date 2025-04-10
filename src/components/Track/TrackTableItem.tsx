"use client"

import { Track } from "@spotify/web-api-ts-sdk"
import { TableCell, TableRow } from "../ui/table"
import { formatNumber, secondsToTime } from "@/lib/utils"
import TrackDialog from "./TrackDialog"
import { useState } from "react"
import { getSmallestImage } from "@/lib/Spotify/SpotifyUtils"
import TrackExplicit from "./TrackExplicit"

export default function TrackTableItem({
    track,
    i,
    playcount,
}: {
    track: Track
    i?: number
    playcount?: number
}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow className="cursor-pointer" onClick={() => setOpen(true)}>
                {i !== undefined && (
                    <TableCell className="text-right font-medium">
                        {i}
                    </TableCell>
                )}
                <TableCell>
                    <div className="flex items-center gap-5">
                        <div>
                            <img
                                alt={track.name}
                                src={getSmallestImage(track.album.images).url}
                                width={50}
                                height={50}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-md font-semibold">
                                {track.name}
                            </p>
                            <div className="flex gap-1 text-sm opacity-75">
                                {track.explicit && <TrackExplicit />}
                                {track.artists.map((a) => a.name).join(", ")}
                            </div>
                        </div>
                    </div>
                </TableCell>
                {playcount && <TableCell>{formatNumber(playcount)}</TableCell>}
                <TableCell className="hidden md:table-cell">
                    {track.album.name}
                </TableCell>
                {track.album.release_date && (
                    <TableCell className="hidden md:table-cell">
                        {new Date(track.album.release_date).getFullYear()}
                    </TableCell>
                )}
                <TableCell className="text-right">
                    {secondsToTime(track.duration_ms / 1000)}
                </TableCell>
            </TableRow>
            <TrackDialog track={track} open={open} onOpenChange={setOpen} />
        </>
    )
}
