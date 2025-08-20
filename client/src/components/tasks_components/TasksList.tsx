import TaskCard from "./TaskCard";
import type { Task } from "./TasksContainer";

interface TasksListProps {
    tasks: Task[];
    deleteTask: (id: string) => void;
    updateTask: (id: string, updatedTask: Partial<Task>) => void;
}

export default function TasksList({ tasks, deleteTask, updateTask }: TasksListProps) {
    return (
        <div className="w-[100%] h-full flex flex-col items-center gap-2 p-5 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            {tasks.map((task, index) => (
                <TaskCard key={index} task={task} deleteTask={deleteTask} updateTask={updateTask} />
            ))}
        </div>
    )
}