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

    // Carrega as tarefas armazenadas no localStorage ao iniciar o componente
	useEffect(() => {
		const storedTasks = localStorage.getItem('tasks')
		if (storedTasks) {
			setTasks(JSON.parse(storedTasks))
		}
	}, [])

    // Salva as tarefas no localStorage sempre que elas mudam
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	return (
		<div className="bg-[#a5a5a515] border-4 border-gray-50 w-full max-w-xl lg:max-w-none lg:w-[100%] h-[100%] flex flex-col gap-5 p-4 sm:p-6 rounded-3xl">
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
