import { useState } from 'react'
import InputField from './InputField'

interface TimerConfigProps {
	setConfig: (
		pomodoroDuration: number,
		shortBreakDuration: number,
		longBreakDuration: number,
		pomodoroCycles: number,
		sessions: number
	) => void
    lastValues: { pomodoroDuration: number; shortBreakDuration: number; longBreakDuration: number; pomodoroCycles: number; sessions: number }
	closeConfig: () => void
}

export default function TimerConfig({ setConfig, closeConfig, lastValues }: TimerConfigProps) {
	const [pomodoroDuration, setPomodoroDuration] = useState(lastValues.pomodoroDuration || 25)
	const [shortBreakDuration, setShortBreakDuration] = useState(lastValues.shortBreakDuration || 5)
	const [longBreakDuration, setLongBreakDuration] = useState(lastValues.longBreakDuration || 23)
	const [pomodoroCycles, setPomodoroCycles] = useState(lastValues.pomodoroCycles || 3)
	const [sessions, setsessions] = useState(lastValues.sessions || 4)

	const handleApply = () => {
        console.log(`Applying config: ${pomodoroDuration}, ${shortBreakDuration}, ${longBreakDuration}, ${pomodoroCycles}, ${sessions}`)
		setConfig(pomodoroDuration * 60, shortBreakDuration * 60, longBreakDuration * 60, pomodoroCycles, sessions)
		closeConfig()
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, inp: string) => {
		const value = e.target.value
		if (inp === 'pomodoro') {
			setPomodoroDuration(parseInt(value))
		} else if (inp === 'shortBreak') {
			setShortBreakDuration(parseInt(value))
		} else if (inp === 'longBreak') {
			setLongBreakDuration(parseInt(value))
		} else if (inp === 'pomodoroCycles') {
			setPomodoroCycles(parseInt(value))
		} else if (inp === 'sessions') {
			setsessions(parseInt(value))
		}
	}

	const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>, inp: string) => {
		const value = Number(e.target.value)
		if (value < 1 || isNaN(value)) {
			if (inp === 'pomodoro') {
				setPomodoroDuration(1)
			} else if (inp === 'shortBreak') {
				setShortBreakDuration(1)
			} else if (inp === 'longBreak') {
				setLongBreakDuration(1)
			} else if (inp === 'pomodoroCycles') {
				setPomodoroCycles(1)
			} else if (inp === 'sessions') {
				setsessions(1)
			}
		}
	}

	return (
		<div className="relative col-span-4 w-[90%] max-w-md bg-[#494949] p-6 rounded-xl shadow-lg flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold text-gray-100">Timer Settings</h2>
				<button
					onClick={() => {
						handleApply()
						closeConfig()
					}}
					className="text-orange-500 hover:text-gray-100 transition-colors"
					aria-label="Close settings"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<div className="flex flex-col gap-4">
				<InputField
					label="Pomodoro Duration"
					id="pomodoro-duration"
					value={pomodoroDuration}
					onChange={(e) => handleInputChange(e, 'pomodoro')}
					onBlur={(e) => handleInputBlur(e, 'pomodoro')}
					unit="minutes"
				/>
				<InputField
					label="Short Break Duration"
					id="short-break-duration"
					value={shortBreakDuration}
					onChange={(e) => handleInputChange(e, 'shortBreak')}
					onBlur={(e) => handleInputBlur(e, 'shortBreak')}
					unit="minutes"
				/>
				<InputField
					label="Long Break Duration"
					id="long-break-duration"
					value={longBreakDuration}
					onChange={(e) => handleInputChange(e, 'longBreak')}
					onBlur={(e) => handleInputBlur(e, 'longBreak')}
					unit="minutes"
				/>
				<InputField
					label="Pomodoro Cycles"
					id="pomodoro-cycles"
					value={pomodoroCycles}
					onChange={(e) => handleInputChange(e, 'pomodoroCycles')}
					onBlur={(e) => handleInputBlur(e, 'pomodoroCycles')}
					unit="cycles"
				/>
				<InputField
					label="Long Break Interval"
					id="long-break-delay"
					value={sessions}
					onChange={(e) => handleInputChange(e, 'sessions')}
					onBlur={(e) => handleInputBlur(e, 'sessions')}
					unit="sessions"
				/>
			</div>
		</div>
	)
}
