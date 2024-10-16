import { getLuminance } from "@/lib/Misc/ColorHelper"
import { SyntheticEvent, useMemo, useState } from "react"

export default function useImageColor(alpha: number = 1) {
    const [color, setColor] = useState<string>()

    function onLoad(e: SyntheticEvent<HTMLImageElement, Event>) {
        setColor(getAccentColorFromImageElement(e.currentTarget, alpha))
    }

    const luminance = useMemo(() => {
        if (!color) return null
        return getLuminance(color)
    }, [color])

    return {
        color,
        onLoad,
        luminance,
    }
}

function getAccentColorFromImageElement(
    img: HTMLImageElement,
    alpha: number = 1
): string {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
        throw new Error("Could not get 2D context from canvas")
    }

    // Resize image for faster processing
    const scaleFactor = Math.min(1, 100 / Math.max(img.width, img.height))
    const width = Math.round(img.width * scaleFactor)
    const height = Math.round(img.height * scaleFactor)

    canvas.width = width
    canvas.height = height
    ctx.drawImage(img, 0, 0, width, height)

    const imageData = ctx.getImageData(0, 0, width, height)
    const data = imageData.data

    const colorCounts: { [key: string]: number } = {}
    const saturationThreshold = 0.3
    const brightnessThreshold = 0.3
    const step = 4 // Skip pixels for even faster processing

    for (let i = 0; i < data.length; i += step * 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]

        // Fast and simple saturation and brightness check
        const max = Math.max(r, g, b)
        const min = Math.min(r, g, b)
        const d = max - min
        const l = (max + min) / 510 // Normalized to [0, 1]

        if (
            d / 255 > saturationThreshold &&
            l > brightnessThreshold &&
            l < 0.8
        ) {
            const key = `${r},${g},${b}`
            colorCounts[key] = (colorCounts[key] || 0) + 1
        }
    }

    // Find the most common color that meets our criteria
    let maxCount = 0
    let accentColor = ""

    for (const [key, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
            maxCount = count
            accentColor = key
        }
    }

    if (!accentColor) {
        // Fallback to average color if no accent color is found
        return getAverageColor(data)
    }

    const [r, g, b] = accentColor.split(",").map(Number)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function getAverageColor(data: Uint8ClampedArray): string {
    let r = 0,
        g = 0,
        b = 0
    const totalPixels = data.length / 4

    for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
    }

    r = Math.round(r / totalPixels)
    g = Math.round(g / totalPixels)
    b = Math.round(b / totalPixels)

    return `rgba(${r}, ${g}, ${b}, 1)`
}
