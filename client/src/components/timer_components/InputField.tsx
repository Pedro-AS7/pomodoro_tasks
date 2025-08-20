import React from 'react';

interface InputFieldProps {
    label: string;
    id: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    unit: string;
}
// O componente recebe as props necessárias para cada campo
const InputField = ({ label, id, value, onChange, onBlur, unit }: InputFieldProps) => {
    return (
        <div className="flex items-center justify-between">
            <label htmlFor={id} className="text-gray-100">
                {label}
            </label>
            <div className="flex items-center gap-2">
                <input
                    id={id}
                    type="number"
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className="w-32 p-1 border-1 border-gray-200 rounded-lg text-center text-white text-lg font-semibold focus:ring-2"
                />
                <span className="text-sm w-[3rem] text-white">{unit}</span>
            </div>
        </div>
    );
};

export default InputField;