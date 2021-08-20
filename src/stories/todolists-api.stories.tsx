import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'aa1f6061-8f98-4319-8eee-239786445cdc'
    }
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
        const todolistId = 'aa1f6061-8f98-4319-8eee-239786445cdc'
        todolistApi.deleteTodo(todolistId).then((res) => { //после ответа выполни вот этот коллбек, res - ответ от сервера
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
//----------------------------------------------------------------------------------------------------------------------
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolisId = '00671240-4a58-4978-9e26-12bccdc0aa6b'
        const title = 'I CHANGED!'
        todolistApi.updateTodoTitle(todolisId, title).then((res) => { //после ответа выполни вот этот коллбек, res - ответ от сервера
            setState(res.data.data)
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
