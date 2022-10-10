import { ChangeEventHandler } from "react"

interface InputProps{
    autoComplete?: string
    type?: string
    value: string | number
    onChange: ChangeEventHandler
}

export function Input({autoComplete = 'off', type = 'text', value, onChange}: InputProps){
    return (
        <input 
            autoComplete={autoComplete}
            type={type} 
            value={value} 
            onChange={onChange}
        />
    )
}