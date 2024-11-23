"use client"
import Spinner from "../Misc/Spinner"

export default function LyricLoader() {
    return (
        <div className="flex h-lvh w-lvw items-center justify-center text-white">
            <div>
                <div className="flex justify-center">
                    <Spinner size={100} />
                </div>
                <div className="mt-5 text-3xl font-bold">
                    Loading good things...
                </div>
            </div>
        </div>
    )
}
