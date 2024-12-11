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
import { Switch } from "@/components/ui/switch"

export default function ToggleSetting({
    name,
    initialValue,
}: {
    name: string
    initialValue: boolean
}) {
    const [value, setValue] = useState<boolean>(initialValue)

    const { isPending, currentValue } = useSettings(name, value.toString())

    useEffect(() => {
        setValue(currentValue === "true")
    }, [currentValue])

    return (
        <Switch
            disabled={isPending}
            checked={value}
            onCheckedChange={(checked) => {
                setValue(checked)
            }}
        />
    )
}
