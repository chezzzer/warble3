"use client"

import { Clock } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export default function Time() {
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
        <div className="flex items-center gap-2 rounded-full bg-white p-2 px-4 text-black shadow-lg transition-colors dark:bg-slate-900 dark:text-white">
            <Clock size={25} />{" "}
            <span className="relative -bottom-[1px]">{time}</span>
        </div>
    )
}
