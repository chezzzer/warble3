"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ErrorPage({ error }: { error: Error }) {
    const router = useRouter()

    return (
        <div className="flex h-lvh w-lvw items-center justify-center">
            <div className="text-center">
                <div className="text-7xl">Error</div>
                <div className="mt-5 font-semibold">
                    <p>{error.message}</p>
                    <div className="mt-5">
                        <Button onClick={() => router.back()}>Go back</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
