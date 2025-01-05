import type { User as SpotifyUser } from "@spotify/web-api-ts-sdk"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import User from "./User"

export default function UserCarousel({ users }: { users: SpotifyUser[] }) {
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
                {users.map((user, i) => (
                    <CarouselItem
                        className="basis-[250px]"
                        key={i + "-" + user.id}
                    >
                        <User user={user} />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
