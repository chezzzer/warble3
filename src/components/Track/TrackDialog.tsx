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
import { api } from "@/trpc/react"
import { useEffect } from "react"
import Spinner from "../Misc/Spinner"

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

    const { refetch, isFetched, data, isFetching } =
        api.spotify.getPreviewUrl.useQuery(
            { trackId: track.id },
            {
                enabled: false,
            }
        )

    useEffect(() => {
        if (isFetched || !open) return
        refetch()
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={luminance > 0.5 ? "light" : "dark"}>
                <div
                    className="absolute left-0 top-0 z-0 h-[300px] w-full rounded-lg"
                    style={{
                        background: `linear-gradient(to bottom, ${color}, transparent)`,
                    }}
                ></div>
                <div className="relative flex flex-col gap-3">
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
                        {isFetching && (
                            <div className="flex min-h-[50px] items-center justify-center">
                                <Spinner size={32} />
                            </div>
                        )}
                        {data && <TrackPreview color={color} url={data} />}
                    </div>
                    <AddDialog track={track} onAdd={() => onOpenChange(false)}>
                        <Button className="flex w-full items-center gap-2">
                            <Plus size={18} /> Add to Queue
                        </Button>
                    </AddDialog>
                </div>
            </DialogContent>
        </Dialog>
    )
}
