import { LightLogin } from "@/components/ui/sign-in"

export function Demo({ onSuccess }: { onSuccess?: () => void }) {
    return (
        <div className="w-screen">
            <LightLogin onSuccess={onSuccess} />
        </div>
    )
}
