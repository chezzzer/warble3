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
