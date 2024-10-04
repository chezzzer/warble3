import type { Artist as SpotifyArtist } from "@spotify/web-api-ts-sdk"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import Artist from "./Artist"

export default function ArtistCarousel({
    artists,
}: {
    artists: SpotifyArtist[]
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
                {artists.map((artist, i) => (
                    <CarouselItem
                        className="basis-[250px]"
                        key={i + "-" + artist.id}
                    >
                        <Artist artist={artist} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
