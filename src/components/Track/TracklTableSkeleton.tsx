"use client"

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
import { Skeleton } from "../ui/skeleton"

export default function TrackTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell className="w-full">
                            <Skeleton className="h-4" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
