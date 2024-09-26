import Spinner from "../Misc/Spinner"

export default function HomeHeroLoader() {
    return (
        <div className="relative flex h-[300px] items-end p-10">
            <div className="absolute inset-0 flex animate-pulse items-center justify-center bg-slate-700">
                <Spinner size={30} />
            </div>
        </div>
    )
}

