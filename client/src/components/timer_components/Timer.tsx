import { useEffect, useState } from 'react'
import Clock from './Clock'
import ProgressBar from './ProgressBar'
import StartStopButton from './StartStopButton'
import { Cog, RotateCcw, SkipForward } from 'lucide-react'
import TimerConfig from './TimerConfig'

export default function Timer() {
	const [time, setTime] = useState<number>(1500)
	const [isRunning, setIsRunning] = useState(false)
	const [pauseDuration, setPauseDuration] = useState<number>(0)
	const [pomodoroConfig, setPomodoroConfig] = useState<(1 | 2 | 3)[]>()
	const [longPauseDuration, setLongPauseDuration] = useState<number>(0)
	const [timeState, setTimeState] = useState<1 | 2 | 3 | 4>(1)
	const [cyclesNumber, setCyclesNumber] = useState(3)
	const [sessions, setSessions] = useState(2)
	const [timerConfig, setTimerConfig] = useState({
		time: 1500,
		pauseDuration: 300,
		longPauseDuration: 900,
		pomodoroCycles: 3,
		sessions: 2,
	})
	const [isConfig, setIsConfig] = useState(false)

	const getTimerState = { 1: time, 2: pauseDuration, 3: longPauseDuration, 4: 0 }

	function setConfig() {
		setTime(timerConfig.time)
		setPauseDuration(timerConfig.pauseDuration)
		setLongPauseDuration(timerConfig.longPauseDuration)
		setSessions(timerConfig.sessions)
		const config: (1 | 2 | 3)[] = []
		for (let i = 0; i < sessions; i++) {
			for (let j = 0; j < cyclesNumber; j++) {
				config.push(1)
				if (j !== cyclesNumber - 1) {
					config.push(2)
				}
			}
			if (i !== sessions - 1) {
				config.push(3)
			}
		}
		setPomodoroConfig(config.slice(1))
		console.log(config)
		setTimeState(config[0])
		if (isRunning) setIsRunning(false)
		console.log('config: ' + config)
	}

	useEffect(() => {
		console.log('time: ' + timerConfig.time)
		setTime(timerConfig.time)
		setPauseDuration(timerConfig.pauseDuration)
		setLongPauseDuration(timerConfig.longPauseDuration)
		setSessions(timerConfig.sessions)
		const config: (1 | 2 | 3)[] = []
		for (let i = 0; i < sessions; i++) {
			for (let j = 0; j < cyclesNumber; j++) {
				config.push(1)
				if (j !== cyclesNumber - 1) {
					config.push(2)
				}
			}
			if (i !== sessions - 1) {
				config.push(3)
			}
		}
		setPomodoroConfig(config.slice(1))
		console.log(config)
		setTimeState(config[0])
		console.log('config: ' + config)
	}, [])

	useEffect(() => {
		setTime(timerConfig.time)
		setPauseDuration(timerConfig.pauseDuration)
		setLongPauseDuration(timerConfig.longPauseDuration)
		setCyclesNumber((prev) => {
			if (timerConfig.pomodoroCycles !== prev) {
				const config: (1 | 2 | 3)[] = []
				for (let i = 0; i < sessions; i++) {
					for (let j = 0; j < timerConfig.pomodoroCycles; j++) {
						config.push(1)
						if (j !== timerConfig.pomodoroCycles - 1) {
							config.push(2)
						}
					}
					if (i !== sessions - 1) {
						config.push(3)
					}
				}
				setPomodoroConfig(config.slice(1))
				console.log(config)
				setTimeState(config[0])
				return timerConfig.pomodoroCycles
			}
			return prev
		})
		setSessions((prev) => {
			if (timerConfig.sessions !== prev) {
				const config: (1 | 2 | 3)[] = []
				for (let i = 0; i < timerConfig.sessions; i++) {
					for (let j = 0; j < timerConfig.pomodoroCycles; j++) {
						config.push(1)
						if (j !== timerConfig.pomodoroCycles - 1) {
							config.push(2)
						}
					}
					if (i !== timerConfig.sessions - 1) {
						config.push(3)
					}
				}
				setPomodoroConfig(config.slice(1))
				console.log(config)
				setTimeState(config[0])
				return timerConfig.sessions
			}
			return prev
		})
        return () => {}
	}, [timerConfig])

	function getConfigState(): 1 | 2 | 3 | 4 {
		console.log(`config? ` + pomodoroConfig)
		setPomodoroConfig((prev) => prev?.slice(1))
		return pomodoroConfig?.[0] ?? 1
	}

	function changeState() {
		if (pomodoroConfig?.length === 0 && timeState !== 4) {
			console.log('No more states to change to, resetting timer.')
			setTimeState(4)
			setIsRunning(false)
			setTime(0)
			console.log('state: ' + timeState)
		} else if (timeState !== 4) {
			switch (timeState) {
				case 1:
					setTime(timerConfig.time)
					break
				case 2:
					setPauseDuration(timerConfig.pauseDuration)
					break
				case 3:
					setLongPauseDuration(timerConfig.longPauseDuration)
					break
			}
			setTimeState(getConfigState())
		}
	}

	function running() {
		if (timeState === 1) {
			setTime((p) => {
				console.log(`Time: ${p}`)
				if (p <= 0) {
					changeState()
				}
				return p - 1
			})
		}
		if (timeState === 2) {
			setPauseDuration((p) => {
				console.log(`Pause: ${p}`)
				if (p <= 0) {
					changeState()
				}
				return p - 1
			})
		}
		if (timeState === 3) {
			setLongPauseDuration((p) => {
				console.log(`Long Pause: ${p}`)
				if (p <= 0) {
					changeState()
				}
				return p - 1
			})
		}
	}

	return (
		<div className=" w-[50%] h-full flex flex-col justify-center items-center">
			{isConfig ? (
				<TimerConfig
					lastValues={{
						pomodoroDuration: timerConfig.time / 60,
						shortBreakDuration: timerConfig.pauseDuration / 60,
						longBreakDuration: timerConfig.longPauseDuration / 60,
						pomodoroCycles: timerConfig.pomodoroCycles,
						sessions: timerConfig.sessions,
					}}
					setConfig={(pomodoroDuration, shortBreakDuration, longBreakDuration, cyclesNumber, sessions) => {
						setTimerConfig({
							time: pomodoroDuration,
							pauseDuration: shortBreakDuration,
							longPauseDuration: longBreakDuration,
							pomodoroCycles: cyclesNumber,
							sessions: sessions,
						})
						console.log(
							`Config set: ${pomodoroDuration}, ${shortBreakDuration}, ${longBreakDuration}, ${cyclesNumber}, ${sessions}`
						)
					}}
					closeConfig={() => setIsConfig(false)}
				/>
			) : (
				<div className="flex flex-col w-[50%] h-full bg justify-center items-center gap-x-2 gap-y-2">
					<div className="h-[70%] w-full flex flex-col justify-center gap-y-5 items-center">
						<div
							className={`w-fit flex flex-col text-center justify-center items-center text-3xl font-bold ${
								(timeState === 1 && time < timerConfig.time) || (timeState === 1 && isRunning)
									? 'text-orange-500'
									: timeState === 2
									? 'text-green-500'
									: timeState === 3
									? 'text-blue-500'
									: 'text-white'
							}`}
						>
							{timeState === 1
								? 'Focus'
								: timeState === 2
								? 'Short Break'
								: timeState === 3
								? 'Long Break'
								: timeState === 4
								? 'Finished'
								: null}
						</div>
						<Clock
							timer={
								timeState === 1
									? time
									: timeState === 2
									? pauseDuration
									: timeState === 3
									? longPauseDuration
									: 0
							}
							setTimer={running}
							isRunning={isRunning}
						/>
						<ProgressBar
							progress={
								100 -
								(getTimerState[timeState] /
									(timeState === 1
										? timerConfig.time
										: timeState === 2
										? timerConfig.pauseDuration
										: timerConfig.longPauseDuration)) *
									100
							}
						/>
					</div>
					<div className="w-full items-center h-fit flex flex-col gap-3">
						<StartStopButton
							startStop={() =>
								setIsRunning((prev) => {
									if (pomodoroConfig?.length === 0) {
										setConfig()
									}
									return !prev
								})
							}
							value={isRunning ? 'STOP' : 'START'}
						/>
						<div className="flex gap-7 justify-center items-center ">
							<Cog
								className="cursor-pointer hover:scale-110 transition-all duration-200"
								color="black"
								size={24}
								strokeWidth={3}
								cursor="pointer"
								onClick={() => setIsConfig(true)}
							/>
							<RotateCcw
								className="cursor-pointer hover:scale-110 transition-all duration-200"
								color="black"
								strokeWidth={3}
								size={24}
								onClick={() => {
									switch (timeState) {
										case 1:
											setTime(timerConfig.time)
											console.log(`Resetting time to: ${timerConfig.time}`)
											break
										case 2:
											setPauseDuration(timerConfig.pauseDuration)
											break
										case 3:
											setLongPauseDuration(timerConfig.longPauseDuration)
											break
									}
									setIsRunning(false)
								}}
							/>
							<SkipForward
								className="cursor-pointer hover:scale-110 transition-all duration-200"
								color="black"
								size={24}
								strokeWidth={3}
								cursor="pointer"
								onClick={() => {
									changeState()
								}}
							/>
						</div>
						<h1
							onClick={setConfig}
							className="w-[30%] flex gap-3 justify-center items-center bg-gray-100 cursor-pointer rounded-xl mt-2 shadow-sm text-gray-500 text-center text-lmd font-normal hover:scale-101 transition-all duration-200 active:scale-95"
						>
							Reset all
						</h1>
					</div>
				</div>
			)}
		</div>
	)
}
