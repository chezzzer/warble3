"use client"
import { Slider } from "@/components/ui/slider"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { api } from "@/trpc/react"
import { useDebounce } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"

export default function Volume() {
    const [volume, setVolume] = useState<number>()

    const debounced = useDebounce(volume, 100)

    const { context } = useSpotify()

    const { mutate } = api.player.setVolume.useMutation()

    useEffect(() => {
        if (context?.device?.volume_percent === debounced) return
        if (debounced === undefined) return

        mutate({ volume: debounced })
    }, [debounced])

    useEffect(() => {
        if (context?.device?.volume_percent) {
            setVolume(context.device.volume_percent)
        }
    }, [context?.device?.volume_percent])

    return (
        <Slider
            onValueChange={(value) => setVolume(value[0])}
            value={[volume]}
        />
    )
}
