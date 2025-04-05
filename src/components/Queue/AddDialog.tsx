"use client"

import React, { useEffect, useMemo, useState } from "react"
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
import SuccessDialog from "./SuccessDialog"

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
    const [successOpen, setSuccessOpen] = useState(false)
    const { name, setName } = useName()
    const { mutation, queue } = useQueue()

    const addToQueue = async () => {
        mutation.reset()

        try {
            await mutation.mutateAsync({
                spotifyId: track.id,
                name: name,
            })

            setSuccessOpen(true)

            setTimeout(() => {
                setOpen(false)
                setSuccessOpen(false)
                onAdd()
            }, 5000)
        } catch {
            return
        }
    }

    useEffect(() => {
        mutation.reset()
    }, [track])

    const queueIndex = useMemo(() => {
        return queue.findIndex((q) => q.spotifyId === track.id)
    }, [open])

    return (
        <>
            <SuccessDialog open={successOpen} setOpen={setSuccessOpen} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add {track.name} to the Queue</DialogTitle>
                    </DialogHeader>

                    <div className="text-sm text-muted-foreground">
                        <div className="space-y-2">
                            <div>
                                Your song will be slotted in at the{" "}
                                <span className="font-bold">
                                    {numberToOrdinal(queue.length + 1)}
                                </span>{" "}
                                position.
                            </div>
                            {queueIndex >= 0 && (
                                <div className="my-2 flex items-center gap-2 text-yellow-500">
                                    <Warning weight="bold" /> This song is
                                    already {numberToOrdinal(queueIndex + 1)} in
                                    the queue!
                                </div>
                            )}
                        </div>
                    </div>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={(e) => {
                            e.preventDefault()
                            addToQueue()
                        }}
                    >
                        <div>
                            <h6 className="mb-1">Your Name</h6>
                            <Input
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        {mutation.isError && (
                            <div className="text-red-500">
                                {mutation.error.message}
                            </div>
                        )}
                        <div>
                            <Button
                                className="flex w-full items-center gap-2"
                                type="submit"
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
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
