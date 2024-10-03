"use client"

import type { Track } from "@spotify/web-api-ts-sdk"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Dialog } from "../ui/dialog"
import { useState } from "react"
import TrackDialog from "./TrackDialog"

export default function Track({ track }: { track: Track }) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Card
                onClick={() => setOpen(true)}
                className="cursor-pointer transition-colors hover:bg-slate-900/70"
            >
                <CardHeader>
                    <img
                        src={track.album.images[1]?.url}
                        className="aspect-square rounded-lg object-cover"
                        alt={track.name}
                    />
                </CardHeader>
                <CardContent>
                    <p className="text-md overflow-hidden whitespace-nowrap font-semibold">
                        {track.name}
                    </p>
                    <p className="overflow-hidden whitespace-nowrap text-sm text-gray-400">
                        {track.explicit && (
                            <span className="inline-block rounded bg-gray-800 px-2 font-bold">
                                E
                            </span>
                        )}{" "}
                        {track.artists.map((a) => a.name).join(", ")}
                    </p>
                </CardContent>
            </Card>
            <TrackDialog track={track} open={open} onOpenChange={setOpen} />
        </>
    )
}

