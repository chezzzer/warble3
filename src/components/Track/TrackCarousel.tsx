import type { Track as SpotifyTrack } from "@spotify/web-api-ts-sdk"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import Track from "./Track"

export default function TrackCarousel({ tracks }: { tracks: SpotifyTrack[] }) {
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
                {tracks.map((track, i) => (
                    <CarouselItem
                        className="basis-[250px]"
                        key={i + "-" + track.id}
                    >
                        <Track track={track} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}

