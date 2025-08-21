import { useEffect, useState } from 'react'
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
		pomodoroDuration: 31,
		shortBreakDuration: 5,
		longBreakDuration: 15,
		pomodoroCycles: 3,
		sessions: 4,
	})

	useEffect(() => {
		setSettings({
			pomodoroDuration: lastValues.pomodoroDuration,
			shortBreakDuration: lastValues.shortBreakDuration,
			longBreakDuration: lastValues.longBreakDuration,
			pomodoroCycles: lastValues.pomodoroCycles,
			sessions: lastValues.sessions,
		})
	}, [lastValues])

	const handleApply = () => {
		console.log(`Applying settings: ${JSON.stringify(settings)}`)
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
		console.log(`Updated setting: ${JSON.stringify(settings)}`)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, inp: string) => {
		const value = e.target.value
		if (parseInt(value, 10) > 999) {
			inputSetHandler(inp, '999')
		} else {
			inputSetHandler(inp, value)
		}
	}

	const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>, inp: string) => {
		const value = Number(e.target.value)
		if (value < 1 || isNaN(value)) {
			inputSetHandler(inp, '1')
		}
	}

	return (
		<div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4">
			{/*
    2. O Painel de Configurações (Seu Código Adaptado)
    - Removido `absolute` e `col-span-4`, pois o backdrop agora controla o posicionamento.
    - `w-full max-w-md`: Comportamento responsivo perfeito. Ocupa 100% da largura em telas pequenas
      e é limitado a `max-w-md` em telas maiores.
    - `bg-white`: O painel agora tem um fundo sólido para contrastar com o backdrop.
    - `p-6 sm:p-8`: Padding responsivo que é um pouco menor em telas pequenas.
  */}
			<div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-5">
				<div className="flex justify-between items-center">
					{/* Título com fonte responsiva */}
					<h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Timer Settings</h2>
					<button
						onClick={() => {
							handleApply()
							closeConfig()
						}}
						className="text-gray-500 hover:text-orange-500 hover:scale-110 transition-all duration-200"
						aria-label="Close settings"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-7 w-7" // Ícone levemente menor para um visual mais refinado
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2.5}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Linha divisória */}
				<div className="w-full bg-gray-200 h-[1px]"></div>

				{/* Container para os campos de input. O gap pode ser ajustado conforme necessário. */}
				<div className="flex flex-col gap-4">
					<InputField
						label="Pomodoro Duration"
						id="pomodoro-duration"
						value={settings.pomodoroDuration}
						onChange={(e) => handleInputChange(e, 'pomodoroDuration')}
						onBlur={(e) => handleInputBlur(e, 'pomodoroDuration')}
						unit="minutes"
					/>
					<InputField
						label="Short Break Duration"
						id="short-break-duration"
						value={settings.shortBreakDuration}
						onChange={(e) => handleInputChange(e, 'shortBreakDuration')}
						onBlur={(e) => handleInputBlur(e, 'shortBreakDuration')}
						unit="minutes"
					/>
					<InputField
						label="Long Break Duration"
						id="long-break-duration"
						value={settings.longBreakDuration}
						onChange={(e) => handleInputChange(e, 'longBreakDuration')}
						onBlur={(e) => handleInputBlur(e, 'longBreakDuration')}
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
		</div>
	)
}
