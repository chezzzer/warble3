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
                        <Link href={`/album/${track.album.id}`}>
                            <img
                                src={getLargestImage(track.album.images)?.url}
                                width={150}
                                height={150}
                                className="rounded-lg object-cover"
                            />
                        </Link>
                        <div className="flex-1">
                            <Link href={`/album/${track.album.id}`}>
                                <DialogTitle className="text-2xl font-semibold">
                                    {track.name}
                                </DialogTitle>
                            </Link>
                            <div className="text-gray-400">
                                {track.explicit && (
                                    <span className="inline-block rounded bg-gray-800 px-2 font-bold">
                                        E
                                    </span>
                                )}{" "}
                                <ArtistList artists={track.artists} />
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
