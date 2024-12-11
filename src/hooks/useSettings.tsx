import { api } from "@/trpc/react"
import { TRPCError } from "@trpc/server"
import { useDebounce } from "@uidotdev/usehooks"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function useSettings(name: string, value: string) {
    const [currentValue, setCurrentValue] = useState<string>(value)
    const debouncedValue = useDebounce(value, 500)

    const { mutateAsync, isPending } = api.settings.set.useMutation()

    const { data, refetch } = api.settings.get.useQuery(
        {
            name,
        },
        {
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            refetchInterval: 10000,
        }
    )

    useEffect(() => {
        if (!data || !data.value) return
        setCurrentValue(data.value)
    }, [data])

    useEffect(() => {
        if (debouncedValue === currentValue) return

        const loader = toast.loading("Saving...", {
            action: {
                label: "Undo",
                onClick: () => {
                    mutateAsync({
                        name,
                        value: currentValue.toString(),
                    })
                        .then((result) => {
                            toast.success(`Changed back to ${result.value}`)
                            setCurrentValue(result.value)
                        })
                        .catch((e: TRPCError) => {
                            toast.error(e.message)
                        })
                },
            },
        })

        mutateAsync({
            name,
            value: debouncedValue.toString(),
        })
            .then((result) => {
                toast.success(`Saved ${result.value} into ${result.name}`, {
                    id: loader,
                })
                setCurrentValue(result.value)
            })
            .catch((e: TRPCError) => {
                toast.error(e.message, {
                    id: loader,
                })
            })
    }, [debouncedValue])

    return {
        refetch,
        isPending,
        currentValue,
    }
}
