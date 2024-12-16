"use client"

import { useSpotify } from "@/lib/Context/SpotifyContext"
import { api } from "@/trpc/react"
import { Rewind as Icon } from "@phosphor-icons/react"

export default function Rewind() {
    const { mutate } = api.player.rewind.useMutation()

    const rewind = () => {
        mutate()
    }

    return (
        <Icon
            size={30}
            weight="fill"
            className="cursor-pointer"
            onClick={rewind}
        />
    )
}
