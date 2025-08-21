interface StopStartButtonProps {
	startStop: () => void
	value: 'START' | 'STOP'
}

export default function StartStopButton({ startStop, value }: StopStartButtonProps) {
	return (
		<button
			onClick={startStop}
			className={`col-span-4 w-[100%] py-4 ${
				value === 'START' ? 'bg-green-500' : 'bg-orange-500'
			} text-white font-bold text-[1.1rem] rounded-4xl cursor-pointer ${
				value === 'START' ? 'hover:bg-green-400' : 'hover:bg-orange-400'
			} hover:scale-101 transition-all duration-100 active:scale-97`}
		>
			{value}
		</button>
	)
}
