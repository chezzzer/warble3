import { Track } from "@spotify/web-api-ts-sdk"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import WavesurferPlayer from "@wavesurfer/react"
import { useEffect, useRef, useState } from "react"
import {
    Camera,
    Disc,
    PauseCircle,
    Play,
    PlayCircle,
    Plus,
} from "@phosphor-icons/react"
import WaveSurfer from "wavesurfer.js"
import TrackPreview from "./TrackPreview"
import { DiscAlbum, Smartphone } from "lucide-react"
import { Button } from "../ui/button"
import AddDialog from "../Queue/AddDialog"

export default function TrackDialog({
    track,
    open,
    onOpenChange,
}: {
    track: Track
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-8">
                        <img
                            src={track.album.images[1]?.url}
                            width={150}
                            height={150}
                            className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <DialogTitle className="text-2xl font-semibold">
                                {track.name}
                            </DialogTitle>
                            <div className="text-gray-400">
                                {track.explicit && (
                                    <span className="inline-block rounded bg-gray-800 px-2 font-bold">
                                        E
                                    </span>
                                )}{" "}
                                {track.artists.map((a) => a.name).join(", ")}
                            </div>
                            <Dialog>
                                <DialogTrigger>
                                    <div className="mt-2 flex items-center gap-2 text-gray-200">
                                        <Smartphone size={20} />
                                        Send to Phone
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <img
                                        src={`https://scannables.scdn.co/uri/plain/svg/020817/white/640/${track.uri}`}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </DialogHeader>
                <div className="my-3">
                    {track.preview_url && <TrackPreview track={track} />}
                </div>
                <AddDialog track={track} onAdd={() => onOpenChange(false)}>
                    <Button className="flex w-full items-center gap-2">
                        <Plus size={18} /> Add to Queue
                    </Button>
                </AddDialog>
            </DialogContent>
        </Dialog>
    )
}

