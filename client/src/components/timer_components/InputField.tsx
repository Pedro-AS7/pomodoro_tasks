import React from 'react'

interface InputFieldProps {
	label: string
	id: string
	value: number
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
	unit: string
}

const InputField = ({ label, id, value, onChange, onBlur, unit }: InputFieldProps) => {
	return (
		<div className="flex items-center justify-between">
			<label htmlFor={id} className="text-gray-600">
				{label}
			</label>
			<div className="flex items-center gap-2">
				<input
					id={id}
					type="number"
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					className="w-32 p-1 border-1 border-gray-500 rounded-lg text-center text-gray-800 text-lg font-semibold focus:ring-0"
				/>
				<span className="text-[12px] w-[3rem] text-gray-800">{unit}</span>
			</div>
		</div>
	)
}

export default InputField
