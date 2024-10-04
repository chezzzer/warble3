import { replaceSpotifyUriLinks } from "@/lib/Spotify/SpotifyUtils"
import { ScrollArea } from "../ui/scroll-area"

export default function ArtistBio({ bio }: { bio: string }) {
    return (
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div
                className="whitespace-pre-wrap text-sm text-slate-300 [&>a]:text-white [&>a]:underline"
                dangerouslySetInnerHTML={{
                    __html: replaceSpotifyUriLinks(bio),
                }}
            />
        </ScrollArea>
    )
}
