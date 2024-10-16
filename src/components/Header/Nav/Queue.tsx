import QueueItem from "@/components/Queue/QueueItem"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useQueue } from "@/lib/Context/QueueContext"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { MaskSad, Queue as QueueIcon } from "@phosphor-icons/react"

export default function Queue() {
    const { queue } = useQueue()
    const { progress, track } = useSpotify()

    return (
        <Popover>
            <PopoverTrigger className="mb-10 w-full">
                <div className="flex justify-center">
                    <QueueIcon size={30} weight="regular" />
                </div>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                alignOffset={-20}
                sideOffset={20}
                side="right"
                className="w-[400px]"
            >
                <h1 className="text-2xl font-semibold">Coming Up</h1>
                <div className="mt-3 flex flex-col gap-5">
                    {queue?.map((item, i) => {
                        let amount = 0
                        for (let j = 0; j < i; j++) {
                            amount += queue[j].track.duration_ms
                        }

                        return (
                            <QueueItem
                                request={item}
                                key={item.id}
                                playingIn={
                                    (track.duration_ms - progress + amount) /
                                    1000
                                }
                            />
                        )
                    })}
                    {queue?.length === 0 && (
                        <div className="flex flex-col items-center gap-3">
                            <div>
                                <MaskSad size={40} />
                            </div>
                            <div className="text-center text-gray-400">
                                No Songs in Queue
                            </div>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
