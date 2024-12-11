"use client"

import { Request } from "@prisma/client"
import { Badge } from "../ui/badge"
import { Pencil, X } from "@phosphor-icons/react"
import { api } from "@/trpc/react"
import Spinner from "../Misc/Spinner"
import { useQueue } from "@/lib/Context/QueueContext"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { useState } from "react"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Button } from "../ui/button"

export default function QueueItemAdminControls({
    request,
}: {
    request: Request
}) {
    return (
        <Badge variant="outline" className="flex w-fit items-center gap-2">
            <EditButton request={request} />
            <RemoveButton request={request} />
        </Badge>
    )
}

function RemoveButton({ request }: { request: Request }) {
    const { isPending, mutate } = api.request.removeRequest.useMutation()

    if (isPending) {
        return <Spinner size={19} />
    }

    return (
        <X
            onClick={() => mutate({ id: request.id })}
            className="cursor-pointer text-red-500"
            size={19}
        />
    )
}

function EditButton({ request }: { request: Request }) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState<string>(request.name)
    const [spotifyId, setSpotifyId] = useState<string>(request.spotifyId)
    const { isPending, mutateAsync, error } =
        api.request.editRequestSinger.useMutation()

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await mutateAsync({ id: request.id, singer: name, spotifyId })
            setOpen(false)
        } catch (e) {}
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Pencil
                    weight="fill"
                    size={19}
                    className="cursor-pointer text-blue-500"
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Request</DialogTitle>
                </DialogHeader>
                <form className="space-y-3" onSubmit={submit}>
                    <div>
                        <Label>Singer Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Spotify ID</Label>
                        <Input
                            value={spotifyId}
                            onChange={(e) => setSpotifyId(e.target.value)}
                        />
                    </div>
                    {error && (
                        <div className="text-red-500">{error.message}</div>
                    )}
                    <Button
                        disabled={isPending}
                        type="submit"
                        variant="secondary"
                    >
                        Submit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
