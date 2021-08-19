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
        const title = 'TODO!'
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

        const todolisId = 'd41c6c4f-64f0-454f-9afc-622d9918ee63'
        const title = 'TODO!!!'
            todolistApi.updateTodoTitle(todolisId,title).then((res) => { //после ответа выполни вот этот коллбек, res - ответ от сервера
                setState(res.data.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
