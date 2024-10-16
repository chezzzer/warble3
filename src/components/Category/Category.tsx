"use client"

import type {
    Artist,
    Category,
    SimplifiedAlbum,
    Track,
} from "@spotify/web-api-ts-sdk"
import { Card, CardContent, CardHeader } from "../ui/card"
import Link from "next/link"

export default function Category({ category }: { category: Category }) {
    return (
        <>
            <Link href={`/category/${category.id}`}>
                <Card className="cursor-pointer transition-colors dark:hover:bg-slate-900/70">
                    <CardHeader>
                        <img
                            src={category.icons[0].url}
                            className="aspect-square rounded-lg object-cover"
                            alt={category.name}
                        />
                    </CardHeader>
                    <CardContent>
                        <p className="text-md overflow-hidden whitespace-nowrap font-semibold">
                            {category.name}
                        </p>
                        <p className="overflow-hidden whitespace-nowrap text-sm capitalize text-gray-400">
                            Category
                        </p>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}
