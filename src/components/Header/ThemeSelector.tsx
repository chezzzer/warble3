"use client"

import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "next-themes"
import Spinner from "../Misc/Spinner"
import { useEffect, useMemo, useState } from "react"

export default function ThemeSelector() {
    const { theme, setTheme } = useTheme()
    const [currentTheme, setCurrentTheme] = useState<string>()

    useEffect(() => {
        setCurrentTheme(theme)
    }, [theme])

    if (currentTheme === "light") {
        return (
            <div
                className="cursor-pointer rounded-full bg-white p-2 text-black shadow-lg"
                onClick={() => setTheme("dark")}
            >
                <Moon size={23} />
            </div>
        )
    }

    if (currentTheme === "dark") {
        return (
            <div
                className="cursor-pointer rounded-full bg-black p-2 text-white shadow-lg"
                onClick={() => setTheme("light")}
            >
                <Sun size={23} />
            </div>
        )
    }

    return <div></div>
}
