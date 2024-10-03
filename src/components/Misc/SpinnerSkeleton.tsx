import Spinner from "./Spinner"

export default function SpinnerSkeleton() {
    return (
        <div className="flex items-center justify-center px-5 py-10">
            <Spinner size={50} />
        </div>
    )
}

