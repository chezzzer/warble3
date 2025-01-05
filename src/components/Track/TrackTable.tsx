import { Track } from "@spotify/web-api-ts-sdk"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import TrackTableItem from "./TrackTableItem"

export default function TrackTable({
    tracks,
    playcounts,
}: {
    tracks: Track[]
    playcounts?: number[]
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Title</TableHead>
                    {playcounts && <TableHead>Playcount</TableHead>}
                    <TableHead className="hidden md:table-cell">
                        Album
                    </TableHead>
                    {tracks[0].album.release_date && (
                        <TableHead className="hidden md:table-cell">
                            Released
                        </TableHead>
                    )}
                    <TableHead className="w-10">Duration</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tracks
                    .filter((t) => t)
                    .map((track, i) => (
                        <TrackTableItem
                            playcount={playcounts?.[i]}
                            track={track}
                            i={i + 1}
                            key={i}
                        />
                    ))}
            </TableBody>
        </Table>
    )
}
