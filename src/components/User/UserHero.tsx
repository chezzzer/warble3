"use client"

import { ExtractedColor } from "@/lib/Spotify/GetExtractedColors"
import { formatNumber } from "@/lib/utils"
import { Circle } from "@phosphor-icons/react"
import { Album, User } from "@spotify/web-api-ts-sdk"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { getLargestImage } from "@/lib/Spotify/SpotifyUtils"
import { Avatar, AvatarFallback } from "../ui/avatar"

export default function UserHero({
    user,
    color,
}: {
    user: User
    color: ExtractedColor
}) {
    return (
        <>
            <div
                className="dark relative flex min-h-[400px] flex-col justify-end p-10 text-white"
                style={{
                    backgroundImage: `linear-gradient(45deg, ${color.colorDark}, ${color.colorLight})`,
                }}
            >
                <div className="flex w-full items-end justify-between">
                    <div className="flex flex-col gap-10 md:flex-row md:items-end">
                        <div>
                            {user.images.length > 0 && (
                                <img
                                    src={getLargestImage(user.images)?.url}
                                    className="aspect-square w-[200px] rounded-full object-cover drop-shadow-2xl"
                                    alt={user.display_name}
                                />
                            )}
                            {user.images.length === 0 && (
                                <Avatar className="aspect-square h-fit w-[200px] text-4xl drop-shadow-2xl">
                                    <AvatarFallback>
                                        {user.display_name
                                            .toUpperCase()
                                            .substring(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <h1 className="text-7xl font-bold drop-shadow-lg">
                                {user.display_name}
                            </h1>
                            <div className="opacity-75">
                                {formatNumber(user.followers.total)} Followers
                            </div>
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
