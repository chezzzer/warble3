import type { SimplifiedAlbum } from "@spotify/web-api-ts-sdk"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import Album from "./Album"

export default function AlbumCarousel({
    albums,
}: {
    albums: SimplifiedAlbum[]
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
                {albums.map((album, i) => (
                    <CarouselItem
                        className="basis-[250px]"
                        key={i + "-" + album.id}
                    >
                        <Album album={album} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
