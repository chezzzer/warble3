"use client"
import { useEffect, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { useDebounce } from "@uidotdev/usehooks"
import { api } from "@/trpc/react"
import Spinner from "@/components/Misc/Spinner"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { TRPCError } from "@trpc/server"
import useSettings from "@/hooks/useSettings"

export default function RangeSetting({
    name,
    initalValue,
    min,
    max,
}: {
    name: string
    initalValue: number
    min: number
    max: number
}) {
    const [value, setValue] = useState<number>(initalValue)

    const { isPending, currentValue } = useSettings(name, value.toString())

    useEffect(() => {
        setValue(Number.parseInt(currentValue))
    }, [currentValue])

    return (
        <div className="flex items-center gap-3">
            <div className="flex min-h-[30px] min-w-[30px] items-center">
                {isPending ? <Spinner size={20} /> : value}
            </div>
            <div className="flex-1">
                <Slider
                    value={[value]}
                    min={min}
                    max={max}
                    step={1}
                    onValueChange={([number]) => setValue(number)}
                />
            </div>
        </div>
    )
}
