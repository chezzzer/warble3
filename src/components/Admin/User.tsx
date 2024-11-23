"use client"

import { signOut, useSession } from "next-auth/react"
import Spinner from "../Misc/Spinner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMemo } from "react"
import { createAvatar } from "@dicebear/core"
import { lorelei } from "@dicebear/collection"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function User() {
    const { data: session, status } = useSession()

    const avatar = useMemo(() => {
        if (!session) {
            return null
        }

        const avatar = createAvatar(lorelei, {
            seed: session.user.name,
        })

        return avatar.toDataUri()
    }, [session])

    const initials = session?.user?.name?.substring(0, 2).toUpperCase()

    if (status === "loading") {
        return (
            <Avatar>
                <div className="flex h-full w-full items-center justify-center">
                    <Spinner />
                </div>
            </Avatar>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-red-500"
                    onClick={() => signOut()}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
