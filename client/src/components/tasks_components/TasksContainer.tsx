import TaskInput from "./TaskInput";
import TasksList from "./TasksList";

export default function TasksContainer() {
    return (
        <div className="bg-[#494949] w-[40%] h-full flex flex-col gap-5 p-3 rounded-md ">
            <TasksList />
            <TaskInput />
        </div>
    )
}