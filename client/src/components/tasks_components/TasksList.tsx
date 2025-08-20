import TaskCard from "./TaskCard";
import type { Task } from "./TasksContainer";

interface TasksListProps {
    tasks: Task[];
    deleteTask: (id: string) => void;
}

export default function TasksList({ tasks, deleteTask }: TasksListProps) {
    return (
        <div className="w-[100%] h-full flex flex-col items-center gap-2 p-5">
            {tasks.map((task, index) => (
                <TaskCard key={index} task={task} deleteTask={deleteTask} />
            ))}
        </div>
    )
}