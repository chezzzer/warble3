"use client"
import { useQueue } from "@/lib/Context/QueueContext"

export default function Search() {
    const { queue } = useQueue()
    return <>{queue?.map((q) => <div>{q.track.name}</div>)}</>
}

