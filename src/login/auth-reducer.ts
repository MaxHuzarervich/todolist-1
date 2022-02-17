import {authAPI, LoginParamsType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";

type setIsLoggedInAT = {
    type: 'login/SET-IS-LOGGED-IN',
    value: boolean
}

type initialStateType = {
    isLoggedIn: boolean,
}
const initialState: initialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: initialStateType = initialState, action: setIsLoggedInAT): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            debugger
            return {...state, isLoggedIn: action.value} // подменяем в state значение isLoggedIn
        // на то которое сидит в экшене под значением value
        default:
            return state
    }
}
//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//THUNK - ф-ция которая делает асинхронную операцию и по итогу диспатчит экшн
//thunkCreator

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<setIsLoggedInAT | SetStatusActionType | SetErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                debugger
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error: AxiosError) => {
                debugger
                handleServerNetworkError(error, dispatch)
            })
    }

//замыкание - здесь наша санка использует параметры из TC           !!!!!!!

export const logoutTC = () => {
    return (dispatch: Dispatch<setIsLoggedInAT | SetStatusActionType | SetErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    debugger
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    debugger
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

