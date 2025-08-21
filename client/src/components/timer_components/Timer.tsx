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
		<div className="flex flex-col w-full max-w-md h-auto bg-gray-50 rounded-xl shadow-md p-6 gap-6">
			{/* Esta div centraliza o conteúdo do timer. O gap pode ser ajustado para telas menores. */}
			<div className="w-full flex flex-col justify-center items-center gap-y-3 sm:gap-y-5">
				{/* - Tipografia Responsiva: `text-2xl` em telas pequenas e `md:text-3xl` em telas médias ou maiores.
      - A lógica de cores foi mantida, pois é excelente!
    */}
				<div
					className={`w-fit flex flex-col text-center justify-center items-center font-bold text-2xl md:text-3xl ${
						(timeState === 1 && time < timerConfig.time) || (timeState === 1 && isRunning)
							? 'text-orange-500'
							: timeState === 2
							? 'text-green-500'
							: timeState === 3
							? 'text-blue-500'
							: 'text-gray-800' // Cor padrão mais legível que 'text-white' em fundo claro
					}`}
				>
					{/* Lógica de texto mantida */}
					{timeState === 1
						? 'Focus'
						: timeState === 2
						? 'Short Break'
						: timeState === 3
						? 'Long Break'
						: timeState === 4
						? 'Finished'
						: 'Get Ready'}
				</div>

				{/* Componentes Clock e ProgressBar mantidos, pois a lógica interna é que define seu visual */}
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

			{/* Container dos botões e controles */}
			<div className="w-full items-center h-fit flex flex-col gap-4">
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

				{/* - Gap responsivo para os ícones: `gap-6` em telas pequenas e `sm:gap-8` em maiores. */}
				<div className="flex gap-6 sm:gap-8 justify-center items-center">
					<Cog
						className="cursor-pointer hover:scale-110 transition-all duration-200"
						color="black"
						size={24}
						strokeWidth={3}
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
						onClick={changeState}
					/>
				</div>

				{/* - Botão "Reset all" com largura baseada no conteúdo (`w-auto`) e padding (`px-5 py-1`).
      - Isso é muito mais estável do que `w-[30%]`.
    */}
				<button
					onClick={setConfig}
					className="w-auto px-5 py-1 flex gap-3 justify-center items-center bg-gray-200 cursor-pointer rounded-lg mt-2 shadow-sm text-gray-600 text-center font-medium hover:bg-gray-300 transition-all duration-200 active:scale-95"
				>
					Reset all
				</button>
			</div>
		</div>
	)
}
