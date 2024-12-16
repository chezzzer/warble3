"use client"

import { useSpotify } from "@/lib/Context/SpotifyContext"
import { api } from "@/trpc/react"
import { Pause, Play, SkipForward } from "@phosphor-icons/react"

export default function Next() {
    const { mutate } = api.player.next.useMutation()

    const next = () => {
        mutate()
    }

    return (
        <SkipForward
            size={30}
            weight="fill"
            className="cursor-pointer"
            onClick={next}
        />
    )
}
