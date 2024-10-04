"use client"

import { ExtractedColor } from "@/lib/Spotify/GetExtractedColors"
import { formatNumber } from "@/lib/utils"
import { Circle } from "@phosphor-icons/react"
import { Album, Category } from "@spotify/web-api-ts-sdk"
import Link from "next/link"
import { Badge } from "../ui/badge"

export default function CategoryHero({
    category,
    color,
}: {
    category: Category
    color: ExtractedColor
}) {
    return (
        <>
            <div
                className="relative flex h-[300px] flex-col justify-end p-10"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${color.colorDark}, ${color.colorLight})`,
                }}
            >
                <div className="flex w-full items-end justify-between">
                    <div className="flex items-end gap-10">
                        <div>
                            <img
                                src={category.icons[0].url}
                                className="aspect-square rounded-full object-cover drop-shadow-2xl"
                                width={150}
                                height={150}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-7xl font-bold drop-shadow-lg">
                                {category.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="pointer-events-none absolute z-0 h-[300px] w-full"
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${color.color}75, transparent)`,
                }}
            ></div>
        </>
    )
}
