import { useEffect, useState } from 'react'
import TaskInput from './TaskInput'
import TasksList from './TasksList'

export interface Task {
	id: string
	content: string
	isCompleted: boolean
}

export default function TasksContainer() {
	const [tasks, setTasks] = useState<Task[]>([])

	useEffect(() => {
		const storedTasks = localStorage.getItem('tasks')
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	return (
		<div className="bg-[#a5a5a53a] border-4 border-gray-300 w-[40%] h-full  flex flex-col gap-5 p-3 rounded-3xl ">
			<TaskInput addTask={(task) => setTasks((prev) => [...prev, task])} />
			<TasksList
            
				tasks={tasks}
				setTasks={setTasks}
				deleteTask={(id) => {
					setTasks((prev) => prev.filter((task) => task.id !== id))
				}}
				updateTask={(id, updatedTask) => {
					setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
				}}
			/>
		</div>
	)
}
