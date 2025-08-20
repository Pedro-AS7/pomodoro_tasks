import { Check, CircleCheck, TrashIcon } from 'lucide-react'
import type { Task } from './TasksContainer'
import { useState } from 'react'

interface TaskCardProps {
	task: Task
	deleteTask?: (id: string) => void
	updateTask?: (id: string, updatedTask: Partial<Task>) => void
}

export default function TaskCard({ task, deleteTask, updateTask }: TaskCardProps) {
	return (
		<div className="bg-white w-full h-[12%] flex justify-between items-center gap-2 p-4 border border-gray-300 rounded-xl hover:shadow-2xl">
			<Check
				className={`cursor-pointer ${
					task.isCompleted ? 'text-green-500' : 'text-gray-300 hover:text-green-500'
				}`}
				onClick={() => updateTask?.(task.id, { isCompleted: !task.isCompleted })}
				size={22}
				strokeWidth={4}
			/>
			<h2 className={`w-[100%] text-gray-600 text-[1.1rem] font-bold ${task.isCompleted ? 'line-through' : ''}`}>
				{task.content}
			</h2>

			<TrashIcon className="cursor-pointer hover:scale-110" onClick={() => deleteTask?.(task.id)} color="#fa2c36" strokeWidth={4} size={20} />
		</div>
	)
}
