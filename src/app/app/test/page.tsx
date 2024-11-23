"use client"

import { useTheme } from "next-themes"

export default function testPage() {
    // eslint-disable-next-line
    const { theme, setTheme } = useTheme()

    return (
        <div>
            The current theme is: {theme}
            <div>
                <button onClick={() => setTheme("light")}>Light Mode</button>
            </div>
            <div>
                <button onClick={() => setTheme("dark")}>Dark Mode</button>
            </div>
        </div>
    )
}
