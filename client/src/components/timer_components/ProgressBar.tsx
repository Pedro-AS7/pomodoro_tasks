export default function ProgressBar({ progress }: { progress: number }) {
    return (
        <div className="w-full h-2 bg-gray-300 rounded-full">
            <div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}
