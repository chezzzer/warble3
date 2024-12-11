"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useHomeLayout } from "@/lib/Context/HomeLayoutContext"
import { Plus } from "@phosphor-icons/react"

export default function AddRow() {
    const { addRow } = useHomeLayout()

    return (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Plus size={19} /> Add Row
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => addRow("playlist")}>
                        <Plus size={19} />
                        Playlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addRow("popular-artists")}>
                        <Plus size={19} />
                        Popular Artists
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => addRow("popular-releases")}
                    >
                        <Plus size={19} />
                        Popular Releases
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addRow("new-releases")}>
                        <Plus size={19} />
                        New Releases
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addRow("recently-played")}>
                        <Plus size={19} />
                        Recently Played
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => addRow("random-artist")}>
                        <Plus size={19} />
                        Random Artist
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
