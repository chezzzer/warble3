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
import { Plus } from "@phosphor-icons/react"

export default function AddRow() {
    

    return (
        <div className="flex justify-end">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Plus size={19} /> Add Row
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Playlist</DropdownMenuItem>
                    <DropdownMenuItem>Popular Albums</DropdownMenuItem>
                    <DropdownMenuItem>Recently Played</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
