import { useEffect, useState } from "react";
import TaskInput from "./TaskInput";
import TasksList from "./TasksList";

export interface Task {
    id: string
    content: string
}

export default function TasksContainer() {
    const [tasks, setTasks] = useState<Task[]>([])

    function getTasks(): Task[] {
        const stored = localStorage.getItem("tasks");
        return stored ? JSON.parse(stored) : [];
    }

    function removeTask(id: string) {
        const tasks = getTasks();
        const filtered = tasks.filter((task) => task.id !== id);
        saveTasks(filtered);
    }

    function saveTasks(tasks: Task[]) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="bg-[#494949] w-[40%] h-full flex flex-col gap-5 p-3 rounded-md ">
            <TasksList tasks={tasks} deleteTask={(id) => {
                setTasks((prev) => prev.filter((task) => task.id !== id));
            }} />
            <TaskInput addTask={(task) => setTasks((prev) => [...prev, task])} />
        </div>
    )
}