import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function limitArray<T>(arr: T[], limit: number) {
    if (arr.length <= limit) {
        return arr
    }
    return arr.slice(0, limit)
}

export function shuffleArray<T>(arr: T[]) {
    return arr.sort(() => Math.random() - 0.5)
}

export function secondsToTime(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = Math.floor(minutes % 60)

    return `${hours > 0 ? `${hours}:${remainingMinutes < 10 ? "0" : ""}` : ""}${remainingMinutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
}

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function numberToOrdinal(n: number) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
}
