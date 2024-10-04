import type { Playlist as SpotifyPlaylist } from "@spotify/web-api-ts-sdk"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import Playlist from "./Playlist"

export default function PlaylistCarousel({
    playlists,
}: {
    playlists: SpotifyPlaylist[]
}) {
    return (
        <Carousel
            style={{
                maskImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 300px), rgba(0, 0, 0, 0) 100%)`,
            }}
            opts={{
                dragFree: true,
            }}
        >
            <CarouselContent className="px-5">
                {playlists.map((playlist, i) => (
                    <CarouselItem
                        className="basis-[250px]"
                        key={i + "-" + playlist.id}
                    >
                        <Playlist playlist={playlist} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
