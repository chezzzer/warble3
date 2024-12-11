"use client"

import { HomeLayoutProvider } from "@/lib/Context/HomeLayoutContext"
import type { Layout } from "@prisma/client"
import AddRow from "./AddRow"
import LayoutList from "./LayoutList"
import LayoutSave from "./LayoutSave"

export default function LayoutTable({
    initialLayouts,
}: {
    initialLayouts: Layout[]
}) {
    return (
        <HomeLayoutProvider layouts={initialLayouts}>
            <div className="mb-3 flex items-center justify-end gap-5">
                <AddRow />
                <LayoutSave />
            </div>
            <LayoutList />
            <div className="mt-3 flex items-center justify-end gap-5">
                <AddRow />
                <LayoutSave />
            </div>
        </HomeLayoutProvider>
    )
}
