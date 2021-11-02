import React from "react";

export const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setErrorAC = (error: string | null) => (
    {type: 'APP/SET-ERROR', error} as const
)

export const setStatusAC = (status: RequestStatusType) => (
    {type: 'APP/SET-STATUS', status} as const
)

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,
    //если произойдет какая-то глобальная ошибка - мы запишем текст ошибки сюда
    error: null | string
}

export type SetErrorActionType = ReturnType<typeof setErrorAC>;
export type SetStatusActionType = ReturnType<typeof setStatusAC>;
export type ActionsType =
    | SetErrorActionType
    | SetStatusActionType
    