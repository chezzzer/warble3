import Link from "next/link"

export default function Footer() {
    return (
        <div className="mt-5 flex justify-between bg-slate-300 p-5 dark:bg-black">
            <div>&copy; Copyright {new Date().getFullYear()} Ryan Cherry</div>
            <div>
                <Link href="/admin">Admin Area</Link>
            </div>
        </div>
    )
}
