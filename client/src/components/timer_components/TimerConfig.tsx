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
	lastValues: {
		pomodoroDuration: number
		shortBreakDuration: number
		longBreakDuration: number
		pomodoroCycles: number
		sessions: number
	}
	closeConfig: () => void
}

export default function TimerConfig({ setConfig, closeConfig, lastValues }: TimerConfigProps) {
	const [settings, setSettings] = useState({
		pomodoroDuration: lastValues.pomodoroDuration || 25,
		shortBreakDuration: lastValues.shortBreakDuration || 5,
		longBreakDuration: lastValues.longBreakDuration || 23,
		pomodoroCycles: lastValues.pomodoroCycles || 3,
		sessions: lastValues.sessions || 4,
	})

	const handleApply = () => {
		setConfig(
			settings.pomodoroDuration * 60,
			settings.shortBreakDuration * 60,
			settings.longBreakDuration * 60,
			settings.pomodoroCycles,
			settings.sessions
		)
		closeConfig()
	}

	const inputSetHandler = (inp: string, value: string) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			[inp]: parseInt(value, 10),
		}))
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, inp: string) => {
		const value = e.target.value
		inputSetHandler(inp, value)
	}

	const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>, inp: string) => {
		const value = Number(e.target.value)
		if (value < 1 || isNaN(value)) {
			inputSetHandler(inp, '1')
		}
	}

	return (
		<div className="absolute col-span-4 w-[100%] max-w-md bg-[#a5a5a525] p-10 rounded-3xl shadow-sm flex flex-col gap-6">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold text-gray-700">Timer Settings</h2>
				<button
					onClick={() => {
						handleApply()
						closeConfig()
					}}
					className="text-orange-500 hover:text-orange-400 hover:scale-110 transition-all duration-250"
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
			<div className="w-full bg-gray-300 h-[1px]"></div>

			<div className="flex flex-col gap-4">
				<InputField
					label="Pomodoro Duration"
					id="pomodoro-duration"
					value={settings.pomodoroDuration}
					onChange={(e) => handleInputChange(e, 'pomodoro')}
					onBlur={(e) => handleInputBlur(e, 'pomodoro')}
					unit="minutes"
				/>
				<InputField
					label="Short Break Duration"
					id="short-break-duration"
					value={settings.shortBreakDuration}
					onChange={(e) => handleInputChange(e, 'shortBreak')}
					onBlur={(e) => handleInputBlur(e, 'shortBreak')}
					unit="minutes"
				/>
				<InputField
					label="Long Break Duration"
					id="long-break-duration"
					value={settings.longBreakDuration}
					onChange={(e) => handleInputChange(e, 'longBreak')}
					onBlur={(e) => handleInputBlur(e, 'longBreak')}
					unit="minutes"
				/>
				<InputField
					label="Pomodoro Cycles"
					id="pomodoro-cycles"
					value={settings.pomodoroCycles}
					onChange={(e) => handleInputChange(e, 'pomodoroCycles')}
					onBlur={(e) => handleInputBlur(e, 'pomodoroCycles')}
					unit="cycles"
				/>
				<InputField
					label="Long Break Interval"
					id="long-break-delay"
					value={settings.sessions}
					onChange={(e) => handleInputChange(e, 'sessions')}
					onBlur={(e) => handleInputBlur(e, 'sessions')}
					unit="sessions"
				/>
			</div>
		</div>
	)
}
