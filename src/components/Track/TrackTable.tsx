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

export default function TrackTable({ tracks }: { tracks: Track[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Album</TableHead>
                    <TableHead>Released</TableHead>
                    <TableHead className="w-10">Duration</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tracks.map((track, i) => (
                    <TrackTableItem track={track} i={i + 1} key={track.id} />
                ))}
            </TableBody>
        </Table>
    )
}
