export function getLuminance(rgba: string): number {
    // Remove the 'rgb(' or 'rgba(' prefix and ')' suffix
    const rgbValues = rgba
        .replace(/^(rgb|rgba)\(/, "")
        .replace(/\)$/, "")
        .split(",")

    // Parse the RGB values
    const r = parseInt(rgbValues[0], 10)
    const g = parseInt(rgbValues[1], 10)
    const b = parseInt(rgbValues[2], 10)

    // Calculate relative luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance
}

export function rgbaToHex(rgba: string): string {
    // Regular expression to match rgba format
    const rgbaRegex =
        /^rgba?\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})(?:,\s*(?:\d*(?:\.\d+)?))?\)$/

    // Try to match the input string
    const match = rgba.match(rgbaRegex)
    if (!match) {
        throw new Error(
            "Invalid RGBA string format. Expected format: rgba(r,g,b,a)"
        )
    }

    // Extract RGB values from match groups (ignore alpha)
    const [, r, g, b] = match

    // Convert string values to numbers
    const red = parseInt(r, 10)
    const green = parseInt(g, 10)
    const blue = parseInt(b, 10)

    // Validate ranges
    if (
        red < 0 ||
        red > 255 ||
        green < 0 ||
        green > 255 ||
        blue < 0 ||
        blue > 255
    ) {
        throw new Error("RGB values must be between 0 and 255")
    }

    // Convert each component to hex and pad with zeros if necessary
    const redHex = red.toString(16).padStart(2, "0")
    const greenHex = green.toString(16).padStart(2, "0")
    const blueHex = blue.toString(16).padStart(2, "0")

    // Combine RGB components only
    return `#${redHex}${greenHex}${blueHex}`.toUpperCase()
}
