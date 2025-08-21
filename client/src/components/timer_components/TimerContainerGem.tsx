import { useEffect, useState, useCallback, useMemo } from 'react'
import Clock from './Clock'
import ProgressBar from './ProgressBar'
import StartStopButton from './StartStopButton'
import TimerConfig from './TimerConfig'
import { Cog, RotateCcw, SkipForward } from 'lucide-react'

const TIMER_STATES = {
	FOCUS: 1,
	SHORT_BREAK: 2,
	LONG_BREAK: 3,
	FINISHED: 4,
} as const

type TimerState = (typeof TIMER_STATES)[keyof typeof TIMER_STATES]
type PomodoroSequence = (typeof TIMER_STATES.FOCUS | typeof TIMER_STATES.SHORT_BREAK | typeof TIMER_STATES.LONG_BREAK)[]

const generatePomodoroSequence = (cycles: number, sessions: number): PomodoroSequence => {
	const sequence: PomodoroSequence = []
	for (let i = 0; i < sessions; i++) {
		for (let j = 0; j < cycles; j++) {
			sequence.push(TIMER_STATES.FOCUS)
			// Adiciona pausa curta, exceto após o último ciclo de foco
			if (j < cycles - 1) {
				sequence.push(TIMER_STATES.SHORT_BREAK)
			}
		}
		// Adiciona pausa longa, exceto após a última sessão
		if (i < sessions - 1) {
			sequence.push(TIMER_STATES.LONG_BREAK)
		}
	}
	return sequence
}

export default function Timer() {
	const [timerConfig, setTimerConfig] = useState({
		time: 1500, // 25 min
		pauseDuration: 300, // 5 min
		longPauseDuration: 900, // 15 min
		pomodoroCycles: 3,
		sessions: 2,
	})

	const [time, setTime] = useState(timerConfig.time)
	const [pauseDuration, setPauseDuration] = useState(timerConfig.pauseDuration)
	const [longPauseDuration, setLongPauseDuration] = useState(timerConfig.longPauseDuration)

	const [isRunning, setIsRunning] = useState(false)

	const [isConfigOpen, setIsConfigOpen] = useState(false)

	const [currentState, setCurrentState] = useState<TimerState>(TIMER_STATES.FOCUS)

	const [pomodoroSequence, setPomodoroSequence] = useState<PomodoroSequence>([])

	const timeForCurrentState = useMemo(
		() => ({
			[TIMER_STATES.FOCUS]: time,
			[TIMER_STATES.SHORT_BREAK]: pauseDuration,
			[TIMER_STATES.LONG_BREAK]: longPauseDuration,
			[TIMER_STATES.FINISHED]: 0,
		}),
		[time, pauseDuration, longPauseDuration]
	)

	const totalDurationForState = useMemo(
		() => ({
			[TIMER_STATES.FOCUS]: timerConfig.time,
			[TIMER_STATES.SHORT_BREAK]: timerConfig.pauseDuration,
			[TIMER_STATES.LONG_BREAK]: timerConfig.longPauseDuration,
		}),
		[timerConfig]
	)

	const stateInfo = useMemo(
		() => ({
			[TIMER_STATES.FOCUS]: { text: 'Focus', color: 'text-orange-500' },
			[TIMER_STATES.SHORT_BREAK]: { text: 'Short Break', color: 'text-green-500' },
			[TIMER_STATES.LONG_BREAK]: { text: 'Long Break', color: 'text-blue-500' },
			[TIMER_STATES.FINISHED]: { text: 'Finished', color: 'text-white' },
		}),
		[]
	)

	const resetTimer = useCallback(() => {
		setIsRunning(false)
		setTime(timerConfig.time)
		setPauseDuration(timerConfig.pauseDuration)
		setLongPauseDuration(timerConfig.longPauseDuration)

		const newSequence = generatePomodoroSequence(timerConfig.pomodoroCycles, timerConfig.sessions)
		setCurrentState(newSequence[0] || TIMER_STATES.FINISHED)
		setPomodoroSequence(newSequence.slice(1))
	}, [timerConfig])

	const resetState = useCallback(() => {
		switch (currentState) {
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
	}, [currentState, timerConfig])

	const advanceToNextState = useCallback(() => {
		if (pomodoroSequence.length === 0) {
			setCurrentState(TIMER_STATES.FINISHED)
			setIsRunning(false)
			return
		}

		const nextState = pomodoroSequence[0]
		setCurrentState(nextState)
		setPomodoroSequence((prev) => prev.slice(1))

		if (currentState === TIMER_STATES.FOCUS) setTime(timerConfig.time)
		if (currentState === TIMER_STATES.SHORT_BREAK) setPauseDuration(timerConfig.pauseDuration)
		if (currentState === TIMER_STATES.LONG_BREAK) setLongPauseDuration(timerConfig.longPauseDuration)
	}, [pomodoroSequence, currentState, timerConfig])

	/**
	 * Função chamada a cada segundo pelo componente Clock.
	 */
	const handleTick = useCallback(() => {
		const decrementAndCheck = (setter: React.Dispatch<React.SetStateAction<number>>) => {
			setter((prev) => {
				if (prev <= 1) {
					advanceToNextState()
					return 0
				}
				return prev - 1
			})
		}

		switch (currentState) {
			case TIMER_STATES.FOCUS:
				decrementAndCheck(setTime)
				break
			case TIMER_STATES.SHORT_BREAK:
				decrementAndCheck(setPauseDuration)
				break
			case TIMER_STATES.LONG_BREAK:
				decrementAndCheck(setLongPauseDuration)
				break
		}
	}, [currentState, advanceToNextState])

	useEffect(() => {
		resetTimer()
	}, [resetTimer])

	const progress = useMemo(() => {
		if (currentState === TIMER_STATES.FINISHED || !totalDurationForState[currentState]) {
			return 100
		}
		const total = totalDurationForState[currentState]
		const current = timeForCurrentState[currentState]
		return 100 - (current / total) * 100
	}, [currentState, timeForCurrentState, totalDurationForState])

	return (
		<div className="w-full h-full lg:w-[100%] max-w-xl rounded-xl  p-6 sm:p-8">
			{isConfigOpen ? (
				<TimerConfig
					lastValues={{
						pomodoroDuration: timerConfig.time / 60,
						shortBreakDuration: timerConfig.pauseDuration / 60,
						longBreakDuration: timerConfig.longPauseDuration / 60,
						pomodoroCycles: timerConfig.pomodoroCycles,
						sessions: timerConfig.sessions,
					}}
					setConfig={(pomodoroDuration, shortBreakDuration, longBreakDuration, cyclesNumber, sessions) => {
						setTimerConfig(() => {
							console.log(
								`Setting new config: ${pomodoroDuration}, ${shortBreakDuration}, ${longBreakDuration}, ${cyclesNumber}, ${sessions}`
							)
							return {
								time: pomodoroDuration,
								pauseDuration: shortBreakDuration,
								longPauseDuration: longBreakDuration,
								pomodoroCycles: cyclesNumber,
								sessions: sessions,
							}
						})
					}}
					closeConfig={() => setIsConfigOpen(false)}
				/>
			) : null}
			<div className="flex flex-col w-full h-full justify-center items-center gap-8">
				{/* Seção do display do timer */}
				<div className="w-full flex flex-col justify-center items-center gap-y-4">
					{/*
          - Tipografia responsiva: `text-2xl` em telas pequenas e `sm:text-3xl` em telas maiores.
        */}
					<div
						className={`w-fit text-center font-bold text-2xl sm:text-3xl ${
							stateInfo[currentState]?.color || 'text-gray-800'
						}`}
					>
						{stateInfo[currentState]?.text}
					</div>

					<Clock timer={timeForCurrentState[currentState]} setTimer={handleTick} isRunning={isRunning} />

					<ProgressBar progress={progress} />
				</div>

				{/* Seção dos controles */}
				<div className="w-full items-center flex flex-col gap-4">
					<StartStopButton
						startStop={() => {
							if (currentState === TIMER_STATES.FINISHED) {
								resetTimer()
								setIsRunning(true)
							} else {
								setIsRunning((prev) => !prev)
							}
						}}
						value={isRunning ? 'STOP' : 'START'}
					/>

					{/* - Espaçamento dos ícones responsivo: `gap-6` em mobile e `sm:gap-8` em telas maiores. */}
					<div className="flex gap-6 sm:gap-8 justify-center items-center">
						<Cog
							className="cursor-pointer lg:hover:scale-110 transition-all duration-200"
							color="gray"
							size={24}
							strokeWidth={3}
							onClick={() => {setIsConfigOpen(true); setIsRunning(false)}}
						/>
						<RotateCcw
							className="cursor-pointer hover:scale-110 transition-all duration-200"
							color="gray"
							strokeWidth={3}
							size={24}
							onClick={resetState}
						/>
						<SkipForward
							className="cursor-pointer hover:scale-110 transition-all duration-200"
							color="gray"
							size={24}
							strokeWidth={3}
							onClick={advanceToNextState}
						/>
					</div>
				</div>

				{/*
        - Botão "Reset all" agora é um elemento <button> para melhor semântica.
        - `w-auto` faz a largura se ajustar ao conteúdo, e `px-5 py-1` adiciona um padding confortável.
        - Isso é muito mais robusto do que `w-[30%]`.
      */}
				<button
					onClick={resetTimer}
					className="w-auto px-5 py-1 flex justify-center items-center bg-gray-100 cursor-pointer rounded-lg shadow-sm text-gray-600 text-center font-medium hover:bg-gray-200 transition-all duration-200 active:scale-95"
				>
					Reset all
				</button>
			</div>
		</div>
	)
}
