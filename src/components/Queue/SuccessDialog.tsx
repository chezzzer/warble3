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

export default function SuccessDialog({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: (open: boolean) => void
}) {
    return (
        <AlertDialog defaultOpen={open} open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="border-2 border-green-500 bg-green-950">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center text-2xl text-green-100">
                        Success!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-md text-center text-green-200">
                        Your song has been added to the queue, look out for it
                        on the queue screen for when it plays.
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}
