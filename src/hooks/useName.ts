import { useState } from "react"
import { useLocalStorage } from "@uidotdev/usehooks"

export default function useName() {
    const [name, setName] = useLocalStorage("name", null)

    return {
        name,
        setName,
    }
}

