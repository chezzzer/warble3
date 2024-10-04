import { Image } from "@spotify/web-api-ts-sdk"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"

export default function ArtistGallery({ images }: { images: Image[] }) {
    return (
        <Carousel
            opts={{ dragFree: true }}
            style={{
                maskImage: `linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) calc(100% - 100px), rgba(0, 0, 0, 0) 100%)`,
            }}
        >
            <CarouselContent>
                {images.map((image, i) => (
                    <CarouselItem key={i} className="basis-[180px]">
                        <img
                            src={image.url}
                            className="h-full rounded-lg object-cover"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
