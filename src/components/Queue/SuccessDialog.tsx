import { useWindowSize } from "@uidotdev/usehooks"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
} from "../ui/alert-dialog"
import { useEffect } from "react"
import { useApp } from "@/lib/Context/AppContext"

export default function SuccessDialog({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: (open: boolean) => void
}) {
    const { setConfetti } = useApp()

    useEffect(() => {
        setConfetti(open)
    }, [open])

    return (
        <>
            <AlertDialog defaultOpen={open} open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="border-2 border-green-500 bg-green-950">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center text-2xl text-green-100">
                            Queued! 🎉
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-md text-center text-green-200">
                            Your song has been added to the queue, look out for
                            it on the queue screen for when it plays.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
