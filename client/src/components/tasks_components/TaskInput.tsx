import { useState } from 'react'
import type { Task } from './TasksContainer'
import { v4 as uuidv4 } from "uuid";


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
						addTask({ id: uuidv4(), content: task })
						setTask('')
					}
				}}
				type="text"
				placeholder="Add a new task"
				className="w-full p-2 bg-white border border-gray-300 rounded-xl "
			/>
			<button
				onClick={() => {
					addTask({ id: uuidv4(), content: task })
					setTask('')
				}}
				className="px-4 py-1 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 active:scale-97"
			>
				Add
			</button>
		</div>
	)
}
