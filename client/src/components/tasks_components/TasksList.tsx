import TaskCard from './TaskCard'
import type { Task } from './TasksContainer'
import {
	DndContext,
	closestCenter,
	PointerSensor, // Sensor para mouse
	TouchSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from '@dnd-kit/core'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
interface TasksListProps {
	tasks: Task[]
	setTasks: React.Dispatch<React.SetStateAction<Task[]>>
	deleteTask: (id: string) => void
	updateTask: (id: string, updatedTask: Partial<Task>) => void
}

export default function TasksList({ tasks, setTasks, deleteTask, updateTask }: TasksListProps) {
	const [activeTask, setActiveTask] = useState<Task | null>(null)
	const sensors = useSensors(
		useSensor(PointerSensor, {
			// Requer que o mouse se mova 8px para ativar
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(TouchSensor, {
			// Requer um toque de 250ms e tolerância de 5px de movimento
			activationConstraint: {
				delay: 250,
				tolerance: 5,
			},
		})
	)
	function handleDragStart(event: DragStartEvent) {
		const { active } = event
		// Encontra a tarefa correspondente ao ID e a define como ativa
		const task = tasks.find((t) => t.id === active.id)
		setActiveTask(task || null)
	}
	function handleDragEnd(event: DragEndEvent) {
		// Limpa a tarefa ativa ao final do arraste
		setActiveTask(null)

		const { active, over } = event
		if (over && active.id !== over.id) {
			setTasks((currentTasks) => {
				const oldIndex = currentTasks.findIndex((task) => task.id === active.id)
				const newIndex = currentTasks.findIndex((task) => task.id === over.id)
				return arrayMove(currentTasks, oldIndex, newIndex)
			})
		}
	}
	return (
		<DndContext
			sensors={sensors}
			onDragEnd={handleDragEnd}
			collisionDetection={closestCenter}
			onDragStart={handleDragStart}
		>
			<SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
				<div className="max-w-[100%] h-full overflow-x-clip flex flex-col items-center gap-2 py-3 px-2 border-t-2 border-gray-300 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
					{tasks.map((task, index) => (
						<TaskCard key={index} task={task} deleteTask={deleteTask} updateTask={updateTask} />
					))}
				</div>
				<DragOverlay>{activeTask ? <TaskCard task={activeTask} isOverlay={true} /> : null}</DragOverlay>
			</SortableContext>
		</DndContext>
	)
}
