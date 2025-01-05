import { Input } from "@/components/ui/input"
import { useSearch } from "@/lib/Context/SearchContext"
import { cn } from "@/lib/utils"
import { MagnifyingGlass, X } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export default function Search() {
    const { search, setSearch, clear } = useSearch()

    const router = useRouter()
    const inputRef = useRef<HTMLInputElement>(null)

    const goToSearch = () => {
        if (search) {
            router.push(`/app/search?query=${search}`)
        }
    }

    const clearSearch = () => {
        clear()
        inputRef.current?.focus()
    }

    return (
        <div className="relative w-full">
            <div
                className={cn(
                    "pointer-events-none absolute left-[10px] top-0 flex h-full items-center",
                    search ? "text-slate-600" : "text-muted-foreground"
                )}
            >
                <MagnifyingGlass size={24} weight="bold" />
            </div>

            <Input
                ref={inputRef}
                onFocus={goToSearch}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-full border-gray-400 bg-white pl-10 pr-5 text-lg text-slate-600 shadow-lg focus:py-6 focus:pr-6"
                placeholder="Search"
            />

            <div
                className={cn(
                    "absolute right-[10px] top-0 flex h-full cursor-pointer items-center",
                    search ? "text-slate-600" : "text-muted-foreground"
                )}
            >
                <X size={24} weight="bold" onClick={clearSearch} />
            </div>
        </div>
    )
}
