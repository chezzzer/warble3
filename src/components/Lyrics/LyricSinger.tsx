import { useLyrics } from "@/lib/Context/LyricsContext"
import { api } from "@/trpc/react"
import { useEffect, useState } from "react"

export default function LyricSinger() {
    const { track } = useLyrics()
    const [singer, setSinger] = useState<string>()

    api.request.onChange.useSubscription(undefined, {
        onData: (requests) => {
            const request = requests.find(
                (r) => r.spotifyId === track?.id && r.current
            )
            setSinger(request?.name)
        },
    })

    if (!singer) {
        return null
    }

    return (
        <div>
            <span className="font-bold">{singer}</span> is singing
        </div>
    )
}
