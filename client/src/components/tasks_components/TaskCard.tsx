import { Check, GripVertical, TrashIcon } from 'lucide-react'
import type { Task } from './TasksContainer'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TaskCardProps {
	task: Task
    isOverlay?: boolean; 
	deleteTask?: (id: string) => void
	updateTask?: (id: string, updatedTask: Partial<Task>) => void
}

export default function TaskCard({ task, deleteTask, updateTask, isOverlay }: TaskCardProps) {
    // Lógica para drag and drop
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })
	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
		opacity: isDragging ? 0 : 1,
	}

	return (
		<div
			className="bg-white max-w-full min-w-full min-h-[12%] max-h-[100%] grid grid-cols-[auto_1fr_auto_auto] justify-between items-center gap-2 p-4 border-2 cursor-grab active:cursor-grabbing border-gray-200 rounded-2xl hover:shadow-md hover:scale-101 touch-none"
			ref={setNodeRef}
			{...(!isOverlay ? attributes : {})}
			{...(!isOverlay ? listeners : {})}
			style={style}
		>
			<Check
				className={`cursor-pointer ${
					task.isCompleted ? 'text-green-500' : 'text-gray-300 hover:text-green-500'
				}`}
				onClick={() => updateTask?.(task.id, { isCompleted: !task.isCompleted })}
				size={22}
				strokeWidth={4}
			/>
			<h2
				className={`min-w-full flex text-gray-600 text-[1.1rem] break-words font-bold ${
					task.isCompleted ? 'line-through' : ''
				}`}
			>
				{task.content}
			</h2>

			<TrashIcon
				className="cursor-pointer hover:scale-110 transition-shadow 300"
				onClick={() => deleteTask?.(task.id)}
				color="#fa2c36"
				strokeWidth={4}
				size={20}
			/>
			<GripVertical classname="border-0 focus:border-0 active:border-0" color="#4a5565" />
		</div>
	)
}
