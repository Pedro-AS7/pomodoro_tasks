import { useState } from 'react'
import type { Task } from './TasksContainer'
import { v4 as uuidv4 } from 'uuid'

interface TaskInputProps {
	addTask: (task: Task) => void
}

export default function TaskInput({ addTask }: TaskInputProps) {
	const [task, setTask] = useState<string>('')

	return (
		<div className="w-full flex gap-1">
			<input
				value={task}
				onChange={(e) => {
					setTask(e.target.value)
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						if (!task.trim()) return 
						addTask({ id: uuidv4(), content: task, isCompleted: false })
						setTask('')
					}
				}}
				type="text"

				placeholder="Add a new task"
				className="w-full p-4 text-lg border-white bg-[#8b8b8b2f] placeholder-black 
                     text-black rounded-2xl ring-0 ring-transparent focus:ring-[#8b8b8b00]"
			/>
			<button
				onClick={() => {
					if (!task.trim()) return 
					addTask({ id: uuidv4(), content: task, isCompleted: false })
					setTask('')
				}}
				className="px-4 bg-[#8b8b8b2f] text-lg text-black font-bold rounded-2xl hover:bg-[#8b8b8b54] active:scale-97"
			>
				Add
			</button>
		</div>
	)
}
