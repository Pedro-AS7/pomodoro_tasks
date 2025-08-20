import { RotateCcw } from 'lucide-react'
import { useState } from 'react';

interface ResetButtonProps {
    reset: () => void;
    size: number
}

export default function ResetButton({ reset, size }: ResetButtonProps) {
	return (
			<button
				className="w-fit text-white cursor-pointer"
				onClick={reset}
			>
				<RotateCcw size={size} strokeWidth={3} />
			</button>

	)
}
