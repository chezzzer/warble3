import React, { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Track } from "@spotify/web-api-ts-sdk"
import { useQueue } from "@/lib/Context/QueueContext"
import useName from "@/hooks/useName"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Check, Plus, Warning } from "@phosphor-icons/react"
import Spinner from "../Misc/Spinner"
import { numberToOrdinal, sleep } from "@/lib/utils"

import { toast } from "sonner"

export default function AddDialog({
    children,
    track,
    onAdd,
}: {
    children: React.ReactNode
    track: Track
    onAdd?: () => void
}) {
    const [open, setOpen] = useState(false)
    const { name, setName } = useName()
    const { mutation, queue } = useQueue()

    const addToQueue = async () => {
        mutation.reset()

        try {
            await mutation.mutateAsync({
                spotifyId: track.id,
                name: name,
            })
        } catch {
            return
        }

        setOpen(false)

        toast.success("Added to queue!")

        if (onAdd) {
            onAdd()
        }
    }

    useEffect(() => {
        mutation.reset()
    }, [track])

    const queueIndex = queue.findIndex((q) => q.spotifyId === track.id)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add {track.name} to the Queue</DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    <div>
                        Your song will be slotted in at the{" "}
                        <span className="font-bold">
                            {numberToOrdinal(queue.length + 1)}
                        </span>{" "}
                        position.
                    </div>
                    {queueIndex >= 0 && (
                        <div className="my-2 flex items-center gap-2 text-yellow-500">
                            <Warning weight="bold" /> This song is already{" "}
                            {numberToOrdinal(queueIndex + 1)} in the queue!
                        </div>
                    )}
                </DialogDescription>
                <div>
                    <h6 className="mb-1">Your Name</h6>
                    <Input
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {mutation.isError && (
                    <div className="text-red-500">{mutation.error.message}</div>
                )}
                <div>
                    <Button
                        className="flex w-full items-center gap-2"
                        onClick={addToQueue}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? (
                            <Spinner />
                        ) : (
                            <>
                                <Plus size={18} /> Add to Queue
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
