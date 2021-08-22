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
        todolistApi.getTodolists() //делай запросы с объектом setting
            .then((res) => { //после ответа выполни вот этот коллбек, res - ответ от сервера
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//---------------------------------------------------------------------------------------------------------------------

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Todo Two'
        todolistApi.createTodo(title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//---------------------------------------------------------------------------------------------------------------------
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'ea0b888f-77e5-4790-a46e-3e031b081aa3'
        todolistApi.deleteTodo(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//----------------------------------------------------------------------------------------------------------------------
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '811f5298-8624-448b-a285-0ca370e3ceb7'
        const title = 'I SIMPLE TODOLIST!'
        todolistApi.updateTodoTitle(todolistId, title).then((res) => { //после ответа выполни вот этот коллбек, res - ответ от сервера
            setState(res.data.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}//----------------------------------------------------------------------------------------------------------------------
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '80324dfc-4e29-4b68-afce-3bc3d10beb86'
        todolistApi.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}
//----------------------------------------------------------------------------------------------------------------------
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = ''
        const taskId = ''
        todolistApi.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
//-----------------------------------------------------------------------------------------------------------------------
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '2508798e-ce40-4854-8485-1165661bda81'
        const title = 'Buy coffee'

        todolistApi.createTask(todolistId,title).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div> {JSON.stringify(state)} </div>
}
//----------------------------------------------------------------------------------------------------------------------
export const UpdateTask = () => {
    const[state,setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '80324dfc-4e29-4b68-afce-3bc3d10beb86'
        const taskId = '4e84ffbe-2fc3-452b-9169-307ef7868292'
        const title = 'Buy sugar'

        todolistApi.updateTaskTitle(todolistId,taskId,title).then((res) => {
            setState(res.data)
        })
    },[])
    return <div>{JSON.stringify(state)}</div>
}