import WavesurferPlayer from "@wavesurfer/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { PauseCircle, Play, PlayCircle } from "@phosphor-icons/react"
import WaveSurfer from "wavesurfer.js"
import { api } from "@/trpc/react"
import Spinner from "../Misc/Spinner"
import TrackPreviewSkeleton from "./Loaders/TrackPreviewSkeleton"

export default function TrackPreview({
    id,
    color,
}: {
    id: string
    color?: string
}) {
    const { data, isPending } = api.spotify.getPreviewUrl.useQuery({
        trackId: id,
    })

    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (wavesurfer) wavesurfer.setVolume(0.5)
        setIsPlaying(false)
    }, [wavesurfer])

    if (isPending || !data) {
        return <TrackPreviewSkeleton />
    }

    return (
        <div className="relative">
            <div
                className="absolute bottom-0 left-0 top-0 flex h-full cursor-pointer items-center"
                onClick={() => wavesurfer?.playPause()}
            >
                {isPlaying ? (
                    <PauseCircle size={45} weight="fill" />
                ) : (
                    <PlayCircle size={45} weight="fill" />
                )}
            </div>
            <div
                style={{
                    width: "calc(100% - 60px)",
                    marginLeft: "60px",
                }}
            >
                <WavesurferPlayer
                    waveColor="#334155"
                    progressColor={color ?? "#3b82f6"}
                    cursorColor="rgb(255, 255, 255)"
                    barGap={2}
                    normalize={true}
                    onReady={(ws) => setWavesurfer(ws)}
                    barRadius={10}
                    height={50}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    url={data}
                />
            </div>
        </div>
    )
}
