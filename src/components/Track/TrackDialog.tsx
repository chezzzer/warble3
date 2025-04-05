"use client"
import { Plus } from "@phosphor-icons/react"
import { Track } from "@spotify/web-api-ts-sdk"
import { Smartphone } from "lucide-react"
import Link from "next/link"
import AddDialog from "../Queue/AddDialog"
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import TrackPreview from "./TrackPreview"
import ArtistList from "../Artist/ArtistList"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import TrackExplicit from "./TrackExplicit"
import useImageColor from "@/hooks/useImageColor"
import { cn } from "@/lib/utils"
import TrackLyricSample from "./TrackLyricSample"

export default function TrackDialog({
    track,
    open,
    onOpenChange,
}: {
    track: Track
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const { color, onLoad, luminance } = useImageColor()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(luminance > 0.5 ? "light" : "dark", "max-w-3xl")}
            >
                <div
                    className="absolute left-0 top-0 z-0 h-[300px] w-full rounded-lg"
                    style={{
                        background: `linear-gradient(to bottom, ${color}, transparent)`,
                    }}
                ></div>
                <div className="relative flex items-center gap-5">
                    <div className="flex flex-[1.5] flex-col gap-3">
                        <div className="flex items-center gap-8">
                            <Link href={`/app/album/${track.album.id}`}>
                                <img
                                    alt={track.name}
                                    src={
                                        getLargestImage(track.album.images)?.url
                                    }
                                    width={150}
                                    height={150}
                                    className="rounded-lg object-cover"
                                    crossOrigin="anonymous"
                                    onLoad={onLoad}
                                />
                            </Link>
                            <div className="flex-1">
                                <Link href={`/app/album/${track.album.id}`}>
                                    <DialogTitle className="text-2xl font-semibold dark:text-white">
                                        {track.name}
                                    </DialogTitle>
                                </Link>
                                <div className="text-gray-500 dark:text-gray-200">
                                    {track.explicit && <TrackExplicit />}{" "}
                                    <ArtistList artists={track.artists} />
                                </div>
                            </div>
                        </div>
                        <div className="my-3 dark:text-white">
                            <TrackPreview color={color} id={track.id} />
                        </div>
                        <div className="flex">
                            <AddDialog
                                track={track}
                                onAdd={() => onOpenChange(false)}
                            >
                                <div className="rounded-md bg-white p-2 px-4 text-sm font-medium text-black">
                                    <div className="flex items-center gap-2 font-medium">
                                        <Plus size={18} /> Add to Queue
                                    </div>
                                </div>
                            </AddDialog>
                        </div>
                    </div>
                    <TrackLyricSample isrc={track.external_ids?.isrc} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
