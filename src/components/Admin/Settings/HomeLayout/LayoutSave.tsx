import { Button } from "@/components/ui/button"
import { useHomeLayout } from "@/lib/Context/HomeLayoutContext"

export default function LayoutSave() {
    const { save, isPending } = useHomeLayout()

    return (
        <Button onClick={save} disabled={isPending}>
            Save
        </Button>
    )
}
