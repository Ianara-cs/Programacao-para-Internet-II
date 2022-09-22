import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps){
    return (
        <div className="input-control">
            
            <input {...props}></input>

        </div>
    )
}