"use client"

import { createContext, useContext, useEffect, useState } from "react"
import type { PropsWithChildren } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useWindowSize } from "@uidotdev/usehooks"
import Confetti from "react-confetti"
import { cn } from "../utils"

function useProviderValue(timeout_s: number | undefined) {
    const router = useRouter()
    const pathname = usePathname()
    const [confetti, setConfetti] = useState(false)

    useEffect(() => {
        if (!timeout_s) return

        let timeout: NodeJS.Timeout
        const update = () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                if (pathname !== "/app") router.push("/app")
            }, timeout_s * 1000)
        }

        update()

        window.addEventListener("touchmove", update)
        window.addEventListener("mousemove", update)
        window.addEventListener("keydown", update)
        window.addEventListener("scroll", update)

        return () => {
            clearTimeout(timeout)
            window.removeEventListener("touchmove", update)
            window.removeEventListener("mousemove", update)
            window.removeEventListener("keydown", update)
            window.removeEventListener("scroll", update)
        }
    }, [pathname, timeout_s])

    return { confetti, setConfetti }
}

export type Context = ReturnType<typeof useProviderValue>

const AppContext = createContext<Context | undefined>(undefined)
AppContext.displayName = "AppProvider"

export const AppProvider = (
    props: PropsWithChildren<{ timeout: number | undefined }>
) => {
    const { width, height } = useWindowSize()
    const value = useProviderValue(props.timeout)

    return (
        <>
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 z-[100] transition-opacity",
                    value.confetti ? "opacity-100" : "opacity-0"
                )}
            >
                <Confetti
                    numberOfPieces={100}
                    run={value.confetti}
                    width={width}
                    height={height}
                />
            </div>
            <AppContext.Provider value={value} {...props} />
        </>
    )
}

export function useApp() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error(`useApp must be used within a AppContext`)
    }
    return context
}
