"use client"

import { api } from "@/trpc/react"
import { Layout, Prisma, Request } from "@prisma/client"
import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import { useDebounce } from "@uidotdev/usehooks"
import { toast } from "sonner"

function useProviderValue(list: Layout[]) {
    const [layouts, setLayouts] = useState<
        Layout[] | Prisma.LayoutCreateInput[]
    >(list)

    const { mutateAsync, isPending } = api.settings.setLayout.useMutation()

    const save = () => {
        const toastId = toast.loading("Saving Layout...")

        mutateAsync({
            layouts: layouts.map((layout, i) => ({
                name: layout.name,
                position: i,
                row_type: layout.row_type,
                row_data: layout.row_data,
            })),
        })
            .then(() => {
                toast.success("Saved Layout!", {
                    id: toastId,
                })
            })
            .catch((e) => {
                toast.error(e.message, {
                    id: toastId,
                })
            })
    }

    const addRow = (type: string) => {
        setLayouts((layouts) => [
            ...layouts,
            {
                name: "home",
                position: layouts.length,
                row_type: type,
                row_data: "",
            },
        ])
    }

    const removeRow = (index: number) => {
        setLayouts((layouts) => [
            ...layouts.slice(0, index),
            ...layouts.slice(index + 1),
        ])
    }

    const moveRow = (from: number, to: number) => {
        if (from === to) return

        setLayouts((layouts) => {
            const result = [...layouts]
            const [removed] = result.splice(from, 1)
            result.splice(to, 0, removed)

            // Update positions after move
            return result.map((layout, index) => ({
                ...layout,
                position: index,
            }))
        })
    }

    const editRowData = (index: number, data: string) => {
        setLayouts((layouts) => {
            const result = [...layouts]
            result[index].row_data = data
            console.log(result)
            return result
        })
    }

    return {
        isPending,
        save,
        editRowData,
        moveRow,
        removeRow,
        addRow,
        layouts,
    }
}

export type Context = ReturnType<typeof useProviderValue>

const HomeLayoutContext = createContext<Context | undefined>(undefined)
HomeLayoutContext.displayName = "HomeLayoutProvider"

export const HomeLayoutProvider = (
    props: PropsWithChildren & { layouts: Layout[] }
) => {
    const value = useProviderValue(props.layouts)
    return <HomeLayoutContext.Provider value={value} {...props} />
}

export function useHomeLayout() {
    const context = useContext(HomeLayoutContext)
    if (context === undefined) {
        throw new Error(`useHomeLayout must be used within a HomeLayoutContext`)
    }
    return context
}
