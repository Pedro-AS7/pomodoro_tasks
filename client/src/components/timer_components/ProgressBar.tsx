export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="w-full h-2  rounded-full">
            <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
