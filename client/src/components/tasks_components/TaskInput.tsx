import { useState } from 'react'
import type { Task } from './TasksContainer'
import { v4 as uuidv4 } from 'uuid'

interface TaskInputProps {
	addTask: (task: Task) => void
}

export default function TaskInput({ addTask }: TaskInputProps) {
	const [task, setTask] = useState<string>('')

	return (
		<div className="w-full flex gap-3">
			<input
				value={task}
				onChange={(e) => {
					setTask(e.target.value)
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						if (!task.trim()) return // Prevent adding empty tasks
						addTask({ id: uuidv4(), content: task, isCompleted: false })
						setTask('')
					}
				}}
				type="text"
				placeholder="Add a new task"
				className="w-full p-4 text-lg bg-[#ffffff48] placeholder-gray-50 
                     text-gray-50 rounded-xl "
			/>
			<button
				onClick={() => {
					if (!task.trim()) return // Prevent adding empty tasks
					addTask({ id: uuidv4(), content: task, isCompleted: false })
					setTask('')
				}}
				className="px-4 bg-white text-lg text-black font-bold rounded-xl hover:bg-gray-100 active:scale-97"
			>
				Add
			</button>
		</div>
	)
}
