import {setAppErrorAC, SetErrorActionType, setAppStatusAC, SetStatusActionType} from '../app/app-reducer'
import {ResponseType} from '../api/todolist-api'
import {Dispatch} from 'redux'

export function handleServerAppError<D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) {
    if (data.messages.length) {
        debugger
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError =
    (error: { message: string }, dispatch: Dispatch<SetErrorActionType | SetStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}
