"use client"

import { useSpotify } from "@/lib/Context/SpotifyContext"
import { api } from "@/trpc/react"
import { Pause, PauseCircle, Play, PlayCircle } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export default function PlayPause() {
    const [playing, setPlaying] = useState(false)
    const { paused } = useSpotify()

    useEffect(() => {
        setPlaying(!paused)
    }, [paused])

    const { mutate } = api.player.playPause.useMutation()

    const playPause = () => {
        setPlaying(!playing)

        mutate()
    }

    if (playing) {
        return (
            <PauseCircle
                size={30}
                weight="fill"
                className="cursor-pointer"
                onClick={playPause}
            />
        )
    }

    return (
        <PlayCircle
            size={30}
            weight="fill"
            className="cursor-pointer"
            onClick={playPause}
        />
    )
}
