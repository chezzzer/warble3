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
    initialValue,
    min,
    max,
    unit,
}: {
    name: string
    initialValue: number
    min: number
    max: number
    unit?: string
}) {
    const [value, setValue] = useState<number>(initialValue)

    const { isPending, currentValue } = useSettings(name, value.toString())

    useEffect(() => {
        setValue(Number.parseInt(currentValue))
    }, [currentValue])

    return (
        <div className="flex items-center gap-3">
            <div className="flex min-h-[30px] min-w-[35px] items-center">
                {isPending ? <Spinner size={20} /> : value}
                {unit}
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
