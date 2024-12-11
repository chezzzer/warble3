import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useHomeLayout } from "@/lib/Context/HomeLayoutContext"
import { ArrowDown, ArrowUp, Trash } from "@phosphor-icons/react"
import type { Layout } from "@prisma/client"
import { Label } from "@radix-ui/react-dropdown-menu"
import { useEffect, useMemo, useState } from "react"

export default function LayoutRow({
    layout,
    id,
}: {
    layout: Layout
    id: number
}) {
    return (
        <Card>
            <CardHeader className="flex flex-col justify-between md:flex-row">
                <div className="font-mono">{layout.row_type}</div>
                <LayoutControls layout={layout} id={id} />
            </CardHeader>
            <LayoutData layout={layout} id={id} />
        </Card>
    )
}

function LayoutControls({ layout, id }: { layout: Layout; id: number }) {
    const { removeRow, moveRow } = useHomeLayout()

    return (
        <div className="flex items-center gap-3">
            <div className="cursor-pointer" onClick={() => moveRow(id, id - 1)}>
                <ArrowUp size={24} />
            </div>
            <div className="cursor-pointer" onClick={() => moveRow(id, id + 1)}>
                <ArrowDown size={24} />
            </div>
            <div
                className="cursor-pointer text-red-500"
                onClick={() => removeRow(id)}
            >
                <Trash size={24} />
            </div>
        </div>
    )
}

function LayoutData({ layout, id }: { layout: Layout; id: number }) {
    const [data, setData] = useState<string>(layout.row_data)
    const { editRowData } = useHomeLayout()

    useEffect(() => {
        setData(layout.row_data)
    }, [layout])

    useEffect(() => {
        editRowData(id, data)
    }, [data])

    const json = useMemo(() => {
        return data ? JSON.parse(data) : {}
    }, [data])
    const setJson = (value: any) => {
        setData(JSON.stringify(value))
    }

    if (layout.row_type === "playlist") {
        return (
            <CardContent className="flex flex-col gap-2">
                <Label>Playlist ID</Label>
                <Input
                    placeholder="Playlist ID"
                    value={json.playlist_id || ""}
                    onChange={(e) =>
                        setJson({ playlist_id: e.target.value.trim() })
                    }
                />
            </CardContent>
        )
    }

    return null
}
