"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Queue as QueueIcon } from "@phosphor-icons/react"
import QueueList from "./QueueList"

export default function Queue() {
    return (
        <Popover>
            <PopoverTrigger className="mb-10 w-full">
                <div className="flex justify-center">
                    <QueueIcon size={30} weight="regular" />
                </div>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                alignOffset={-20}
                sideOffset={20}
                side="right"
                className="w-[400px]"
            >
                <h1 className="text-2xl font-semibold">Coming Up</h1>
                <QueueList />
            </PopoverContent>
        </Popover>
    )
}
