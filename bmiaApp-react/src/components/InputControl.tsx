import { ReactNode } from "react"

interface InputControl {
    label: string
    children: ReactNode

}


export function InputControl ({label, children}: InputControl) {
    return (
        <div className="input-control">
            <label htmlFor="">{label}</label>
            {children}
        </div>
    )
}