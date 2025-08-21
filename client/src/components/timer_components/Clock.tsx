import { useEffect } from 'react'

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
		<div className="w-full h-fit flex flex-col justify-center items-center">
  {/*
    - O tamanho da fonte agora é responsivo, começando com um valor menor para celulares
      e aumentando progressivamente em telas maiores.
    - `text-7xl`: Tamanho base para telas pequenas (mobile).
    - `md:text-8xl`: Tamanho para telas médias (tablets).
    - `lg:text-[8.5rem]`: O tamanho original, aplicado apenas em telas grandes (desktops).
    - `whitespace-nowrap`: Impede que o timer quebre em duas linhas (ex: "10:" em uma linha e "30" na outra).
  */}
  <h1 className="text-gray-500 font-bold font-mono text-7xl md:text-8xl lg:text-[8.5rem] whitespace-nowrap">
    {TimeTraslate(timer).minutes}:{TimeTraslate(timer).seconds}
  </h1>
</div>
	)
}
