"use client"

import { useSpotify } from "@/lib/Context/SpotifyContext"
import { api } from "@/trpc/react"
import { Pause, Play, SkipBack, SkipForward } from "@phosphor-icons/react"

export default function Previous() {
    const { mutate } = api.player.previous.useMutation()

    const previous = () => {
        mutate()
    }

    return (
        <SkipBack
            size={30}
            weight="fill"
            className="cursor-pointer"
            onClick={previous}
        />
    )
}
