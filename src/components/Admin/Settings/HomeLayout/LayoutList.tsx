"use client"

import { HomeLayoutProvider } from "@/lib/Context/HomeLayoutContext"
import type { Layout } from "@prisma/client"
import LayoutRow from "./LayoutRow"
import AddRow from "./AddRow"

export default function LayoutList({ layouts }: { layouts: Layout[] }) {
    return (
        <HomeLayoutProvider layouts={layouts}>
            <div className="flex flex-col gap-4">
                {layouts.map((layout) => (
                    <LayoutRow layout={layout} />
                ))}
                <AddRow />
            </div>
        </HomeLayoutProvider>
    )
}
