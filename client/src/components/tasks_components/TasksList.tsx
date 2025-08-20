import TaskCard from "./TaskCard";

export default function TasksList() {
    return (
        <div className="w-[100%] h-full flex flex-col items-center gap-2 p-5">
            {Array.from({ length: 5 }, (_, index) => (
                <TaskCard key={index} />
            ))}
        </div>
    )
}