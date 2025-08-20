import { Cog } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ClockProps {
	timer: number
	setTimer: (time: number) => void
	isRunning: boolean
}

export default function Clock({ timer, setTimer, isRunning }: ClockProps) {
	function TimeTraslate(time: number) {
		const minutes = Math.trunc(time / 60)
		const seconds = time % 60

		const strMin = minutes.toString().padStart(2, '0')
		const strSec = seconds.toString().padStart(2, '0')

		return { minutes: strMin, seconds: strSec }
	}

	useEffect(() => {
		if (timer <= 0) {
			setTimer(0)
			return
		}
		let interval: ReturnType<typeof setInterval> | undefined
		if (isRunning) {
			interval = setInterval(() => {
                console.log(`Timer: ${timer}`)
				setTimer(timer)
			}, 1000)
		} else if (!isRunning && timer !== 0) {
			if (interval) clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [isRunning, timer, setTimer])

	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<h1 className="text-white text-[8.5rem] font-bold font-mono">
				{TimeTraslate(timer).minutes}:{TimeTraslate(timer).seconds}
			</h1>
		</div>
	)
}
