"use client"

import QueueItem from "@/components/Queue/QueueItem"
import useKeepAwake from "@/hooks/useKeepWake"
import { useQueue } from "@/lib/Context/QueueContext"
import { useSpotify } from "@/lib/Context/SpotifyContext"
import { MaskSad } from "@phosphor-icons/react"

export default function QueueList({
    display,
    adminControls,
}: {
    display?: boolean
    adminControls?: boolean
}) {
    useKeepAwake()
    const { queue } = useQueue()
    const { progress, track } = useSpotify()
    return (
        <div className="mt-3 flex flex-col gap-5">
            {queue?.map((item, i) => {
                let amount = 0
                for (let j = 0; j < i; j++) {
                    amount += queue[j].track.duration_ms
                }

                return (
                    <>
                        <QueueItem
                            request={item}
                            key={item.id}
                            display={display}
                            adminControls={adminControls}
                            playingIn={
                                track &&
                                (track.duration_ms - progress + amount) / 1000
                            }
                        />

                        <hr />
                    </>
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
    )
}
