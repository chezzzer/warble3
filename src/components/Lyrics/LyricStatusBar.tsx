import { useLyrics } from "@/lib/Context/LyricsContext"
import { Track } from "@spotify/web-api-ts-sdk"
import LyricSinger from "./LyricSinger"

export default function LyricStatusBar() {
    const { progress, context } = useLyrics()

    const track = context.item as Track

    return (
        <>
            {context?.item! && (
                <div
                    className="fixed bottom-[80px] left-0 z-20 h-[2px] bg-blue-500"
                    style={{
                        width: `${(progress / context.item.duration_ms) * 100}%`,
                    }}
                />
            )}
            <div className="fixed bottom-0 left-0 z-20 h-[80px] w-lvw bg-slate-950/50 p-4 text-white backdrop-blur-sm">
                {context?.item! === undefined && (
                    <div className="text-center font-bold">No song playing</div>
                )}
                {context?.item! !== undefined && (
                    <div className="flex h-full items-center gap-4">
                        <img
                            src={track.album.images[2].url}
                            className="h-full"
                        />
                        <div>
                            <div className="text-lg font-bold">
                                {track.name}
                            </div>
                            <div className="text-sm">
                                {track.artists[0].name}
                            </div>
                        </div>
                        <div className="ml-auto">
                            <LyricSinger />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
