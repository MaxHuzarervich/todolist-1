import React from "react";

export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    //если произойдет какая-то глобальная ошибка - мы запишем текст ошибки сюда
    error: null | string
}

const initialState:InitialStateType = {
    status: 'idle',
    error: 'some error!'
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, status: action.error}
        default:
            return {...state}
    }
}

type ActionsType = any