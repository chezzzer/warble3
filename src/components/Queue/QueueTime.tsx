"use client"

import { Clock } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export default function QueueTime() {
    const [time, setTime] = useState<string>()

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(
                new Date().toLocaleTimeString(undefined, {
                    timeStyle: "short",
                })
            )
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center gap-3 text-4xl text-white">
            <Clock size={40} /> {time}
        </div>
    )
}
