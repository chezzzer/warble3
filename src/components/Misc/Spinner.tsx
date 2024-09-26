"use client"

import { CircleNotch as SpinnerIcon } from "@phosphor-icons/react"

type SpinnerProps = {
    size?: number
    className?: string
}

export default function Spinner({ size, className }: SpinnerProps) {
    return (
        <SpinnerIcon
            size={size}
            className={`animate-spin ${className ? className : ""}`}
        />
    )
}

export function SpinnerCentered({ size }: SpinnerProps) {
    return (
        <div className="flex h-full w-full items-center justify-center px-5 py-10">
            <div>
                <SpinnerIcon className="animate-spin" size={size} />
            </div>
        </div>
    )
}

