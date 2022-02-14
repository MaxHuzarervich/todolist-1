import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../login/auth-reducer";
import {AxiosError} from "axios";
import {handleServerNetworkError} from "../utils/error-utils";

//types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,
    //если произойдет какая-то глобальная ошибка - мы запишем текст ошибки сюда
    error: null | string,
    //true когда приложение проинициализировалось (проверили юзера, настройки проверили и т.д.)
    isInitialized: boolean
}

export const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

//actions

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const SetAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//thunk

export const initializedAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))   //залогинены
            dispatch(SetAppInitializedAC(true))
        }
    })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => dispatch(SetAppInitializedAC(true)))
}

export type SetErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitializedActionType = ReturnType<typeof SetAppInitializedAC>
export type ActionsType = SetErrorActionType | SetStatusActionType | SetAppInitializedActionType