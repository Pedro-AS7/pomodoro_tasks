import { TrashIcon } from 'lucide-react'


export default function TaskCard() {
	return (
		<div className="bg-white w-full h-[12%] flex justify-between items-center gap-2 p-4 border border-gray-300 rounded-xl hover:shadow-2xl">
			<button className="w-[20px] p-2 h-[20px] border-2 border-black text-white font-semibold rounded-[100%] hover:scale-96 cursor-pointer"></button>
			<h2 className="w-[100%] text-gray-800 text-[1.1rem] font-semibold">Task Title</h2>
			<button
				className="w-8 p-2 h-8 bg-black self-center rounded-lg flex items-center justify-center active:bg-red-500 hover:bg-red-300 transition-colors cursor-pointer"
			>
				<TrashIcon color="white" strokeWidth={3} />
			</button>
		</div>
	)
}
