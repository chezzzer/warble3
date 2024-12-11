"use client"

import { useHomeLayout } from "@/lib/Context/HomeLayoutContext"
import LayoutRow from "./LayoutRow"
import { sortByKey } from "@/lib/utils"

export default function LayoutList() {
    const { layouts } = useHomeLayout()

    return (
        <div className="flex flex-col gap-4">
            {sortByKey(layouts, "position").map((layout, i) => (
                <LayoutRow key={i} id={i} layout={layout} />
            ))}
        </div>
    )
}
