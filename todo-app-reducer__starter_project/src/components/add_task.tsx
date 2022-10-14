import { ChangeEvent, FormEvent, useState } from "react"
import style from "./AddTask.module.css"

interface AddTaskProps{
    onAddTask: (text: string) => void
}

export function AddTask({onAddTask}: AddTaskProps){

    const [taskText, setTaskText] = useState('')

    const handlerDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value)
    }

    const handlerSubmit = (event: FormEvent) => {
        event.preventDefault()
        onAddTask(taskText)
        setTaskText('')
    }

    return (
        <>
            <form onSubmit={handlerSubmit}>
                <input 
                    className={style.inputAddTask}
                    type="text" 
                    value={taskText} 
                    onChange={handlerDescriptionChange}  
                    placeholder="Descrição" 
                />
                <input className={style.inputSubmit} type="submit" value="Adicionar Tarefa" />
            </form>
        </>
    )
}