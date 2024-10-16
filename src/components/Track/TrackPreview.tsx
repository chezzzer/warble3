import { Track } from "@spotify/web-api-ts-sdk"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import WavesurferPlayer from "@wavesurfer/react"
import { useEffect, useRef, useState } from "react"
import { PauseCircle, Play, PlayCircle } from "@phosphor-icons/react"
import WaveSurfer from "wavesurfer.js"

export default function TrackPreview({
    track,
    color,
}: {
    track: Track
    color?: string
}) {
    const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        setIsPlaying(false)
    }, [wavesurfer])

    return (
        <div className="relative">
            <div
                className="absolute bottom-0 left-0 top-0 flex h-full cursor-pointer items-center"
                onClick={() => wavesurfer?.playPause()}
            >
                {isPlaying ? (
                    <PauseCircle size={30} weight="fill" />
                ) : (
                    <PlayCircle size={30} weight="fill" />
                )}
            </div>
            <div
                style={{
                    width: "calc(100% - 40px)",
                    marginLeft: "40px",
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
                    url={track.preview_url}
                />
            </div>
        </div>
    )
}
