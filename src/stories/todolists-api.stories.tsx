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
        const title = 'I LOVE LIFE!'
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
        const todolistId = '00671240-4a58-4978-9e26-12bccdc0aa6b'
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

        const todolistId = '00671240-4a58-4978-9e26-12bccdc0aa6b'
        const title = 'I CHANGE!'
        todolistApi.updateTodoTitle(todolistId, title).then((res) => { //после ответа выполни вот этот коллбек, res - ответ от сервера
            setState(res.data.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//----------------------------------------------------------------------------------------------------------------------
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'f63b9c0c-1c11-4bff-9eff-70a163a1982f'
        todolistApi.getTasks(todolistId).then((res) => {
            setState(res.data)
        })
    },[])
    return <div> {JSON.stringify(state)} </div>
}