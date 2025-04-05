import { api } from "@/trpc/react"
import TrackTableSkeleton from "./Loaders/TrackTableSkeleton"
import SpinnerSkeleton from "../Misc/SpinnerSkeleton"
import { ScrollArea } from "../ui/scroll-area"
import { useWindowScroll } from "@uidotdev/usehooks"
import { useEffect, useMemo, useRef, useState } from "react"
import { Badge } from "../ui/badge"
import TrackLyricSampleSkeleton from "./Loaders/TrackLyricSampleSkeleton"

export default function TrackLyricSample({
    isrc,
}: {
    isrc: string | undefined
}) {
    const { data, isPending } = api.lyrics.getLyricSample.useQuery(
        {
            isrc,
        },
        {
            enabled: !!isrc,
        }
    )

    if (!isrc) return null

    if (isPending)
        return (
            <div className="flex-1">
                <TrackLyricSampleSkeleton />
            </div>
        )

    if (!data || !isrc) return null

    return (
        <div className="relative flex-1">
            <ScrollArea
                style={{
                    maskImage: `linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 100px), rgba(0, 0, 0, 0) 100%)`,
                }}
                className="h-[275px] w-full whitespace-pre-line rounded-md bg-slate-200/50 p-4 text-lg dark:bg-slate-900/50 dark:text-white"
            >
                {data}
            </ScrollArea>
            <div className="absolute bottom-[10px] flex w-full justify-center">
                <Badge>Scroll for more</Badge>
            </div>
        </div>
    )
}
