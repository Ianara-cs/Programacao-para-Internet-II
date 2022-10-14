import { useEffect } from "react"
import { Task } from "../App"
import { TaskItem } from "./item_task"

interface TaskListProps{
    tasks: Task[]
    onChangeTask: any
    onDeleteTask: (taskId: number) => void
}


export function TaskList({tasks, onChangeTask, onDeleteTask}: TaskListProps){
    useEffect( () => {console.log(tasks)}, [tasks])

    return (
        <>
            <ul>
                {tasks.map(task => (
                   <TaskItem key={task.id} 
                        task={task} 
                        onChangeTask={onChangeTask} 
                        onDeleteTask={onDeleteTask} />
                ))}
            </ul>
        </>
    )
}

