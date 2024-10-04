"use client"

import { Track } from "@spotify/web-api-ts-sdk"
import { TableCell, TableRow } from "../ui/table"
import { secondsToTime } from "@/lib/utils"
import TrackDialog from "./TrackDialog"
import { useState } from "react"

export default function TrackTableItem({
    track,
    i,
}: {
    track: Track
    i?: number
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
                                src={track.album.images[2].url}
                                width={50}
                                height={50}
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-md font-semibold">
                                {track.name}
                            </p>
                            <p className="text-sm opacity-75">
                                {track.artists.map((a) => a.name).join(", ")}
                            </p>
                        </div>
                    </div>
                </TableCell>
                <TableCell>{track.album.name}</TableCell>
                <TableCell className="text-right">
                    {secondsToTime(track.duration_ms / 1000)}
                </TableCell>
            </TableRow>
            <TrackDialog track={track} open={open} onOpenChange={setOpen} />
        </>
    )
}