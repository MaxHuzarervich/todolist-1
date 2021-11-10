import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistApi.getTodoLists() //делай запросы с объектом setting
            .then((res) => { //после ответа выполни вот этот коллбек, res - ответ от сервера
                debugger
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//---------------------------------------------------------------------------------------------------------------------

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Todo Four'
        todolistApi.createTodo(title)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//---------------------------------------------------------------------------------------------------------------------
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '25480cfe-20bd-4c60-bfd2-8843f09e3d10'
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//----------------------------------------------------------------------------------------------------------------------
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '7c11ee7f-4ef4-461c-9bd9-ba4817e9b20f'
        const title = 'ToDo Three!!!UpdatE!!!'
        todolistApi.updateTodoTitle(todolistId, title)
            .then((res) => { //после ответа выполни вот этот коллбек, res - ответ от сервера
                setState(res.data.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}//----------------------------------------------------------------------------------------------------------------------
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '8fb18e2d-0953-44be-86d3-9abced5aee29'
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}
//----------------------------------------------------------------------------------------------------------------------
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteTaskFunction = () => {
        todolistApi.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'taskId'}
                   value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}/>
            <button onClick={deleteTaskFunction}>DelTask</button>
        </div>
    </div>
}
//-----------------------------------------------------------------------------------------------------------------------
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const createTask = () => {

        todolistApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'}
                   value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}/>
            <input placeholder={'title'}
                   value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}/>
            <button onClick={createTask}> Add Task</button>
        </div>
    </div>
}
// export const CreateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//
//         const todolistId = '7c11ee7f-4ef4-461c-9bd9-ba4817e9b20f'
//         const title = 'JS'
//
//         todolistApi.createTask(todolistId, title).then((res) => {
//             setState(res.data)
//         })
//     }, [])
//     return <div> {JSON.stringify(state)} </div>
// }
//----------------------------------------------------------------------------------------------------------------------
// export const UpdateTask = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '80324dfc-4e29-4b68-afce-3bc3d10beb86'
//         const taskId = '4e84ffbe-2fc3-452b-9169-307ef7868292'
//         const title = 'Buy sugar'
//
//         todolistApi.updateTaskTitle(todolistId, taskId, title)
//             .then((res) => {
//                 setState(res.data)
//             })
//     }, [])
//     return <div>{JSON.stringify(state)}</div>
// }