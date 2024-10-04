import { ArtistInfoStats } from "@/lib/Spotify/SpotifyExtraArtistInfo"
import { formatNumber } from "@/lib/utils"

export default function ArtistStats({ stats }: { stats: ArtistInfoStats }) {
    const items = [
        { name: "Followers", value: formatNumber(stats.followers) },
        {
            name: "Monthly Listeners",
            value: formatNumber(stats.monthlyListeners),
        },
        stats.worldRank > 0 && {
            name: "World Rank",
            value: "#" + stats.worldRank,
        },
    ]

    return (
        <div className="flex flex-col gap-3">
            {items.map((item) => {
                return (
                    <div key={item.name}>
                        <div className="text-xl font-semibold">{item.name}</div>
                        <div className="text-md opacity-75">{item.value}</div>
                    </div>
                )
            })}
        </div>
    )
}
