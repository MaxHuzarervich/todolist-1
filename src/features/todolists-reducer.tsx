import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../app/app-reducer";
import {handleServerAppError} from "../utils/error-utils";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    todoListID: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: FilterValuesType,
    todoListID: string
}

export type SetTodoListsAT = {             //для получения тудулистов
    type: 'SET-TODOLISTS',
    todoLists: Array<TodolistType>
}

type ChangeTodoListEntityStatusAT = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    status: RequestStatusType,
    todoListID: string
}

export type ActionUnionType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodoListsAT
    | ChangeTodoListEntityStatusAT

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'  // типизируем переменную filter
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type ThunkDispatch = Dispatch<ActionUnionType | SetStatusActionType | SetErrorActionType>

export const todoListsReducer =
    (state = initialState, action: ActionUnionType): Array<TodolistDomainType> => {
        switch (action.type) {
            case 'REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.todoListID)
            case 'ADD-TODOLIST': {
                const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus: 'idle'}
                //забираем все из того тодолиста что приходит с сервера + filter: 'all'
                return [newTodolist, ...state]
            }
            case 'CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
            case 'CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
            case 'CHANGE-TODOLIST-ENTITY-STATUS':
                return state.map(tl => tl.id === action.todoListID ? {...tl, entityStatus: action.status} : tl)
            case 'SET-TODOLISTS':
                return action.todoLists.map(tl => {
                    return {
                        ...tl,
                        filter: 'all',
                        entityStatus: 'idle'
                    }
                })
            default:
                return state
        }
    }

export const RemoveTodoListsAC = (todoListID: string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID} as const
}
export const AddTodoListAC = (todolist: TodolistType): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListID} as const
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, todoListID} as const
}
export const ChangeTodoListEntityStatusAC = (status: RequestStatusType, todoListID: string) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', status, todoListID} as const
}
export const setTodoListsAC = (todoLists: Array<TodolistType>): SetTodoListsAT => {
    return {type: 'SET-TODOLISTS', todoLists} as const
}

//thunkCreator

export const fetchTodoListsTC = () => {
    return (dispatch: ThunkDispatch): void => {
        dispatch(setAppStatusAC('loading'))
        //1.side effect
        todolistApi.getTodoLists()              //делаем запрос
            .then((res) => {
                //2.dispatch action
                dispatch(setTodoListsAC(res.data))  //затем диспатчим
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch(error => {
                handleServerAppError(error, dispatch)
            })

    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(ChangeTodoListEntityStatusAC('loading', todolistId))
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                dispatch(RemoveTodoListsAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch): void => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.createTodo(title)
            .then((res) => {
                dispatch(AddTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch): void => {
        todolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
                dispatch(ChangeTodoListTitleAC(title, todolistId))
            })
    }
}