import {v1} from "uuid";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
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

export type ActionUnionType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodoListsAT

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed'  // типизируем переменную filter
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todoListsReducer =
    (state = initialState, action: ActionUnionType): Array<TodolistDomainType> => {
        switch (action.type) {
            case 'REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.todoListID)
            case 'ADD-TODOLIST': {
                return [{
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                }, ...state]
            }
            case 'CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
            case 'CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
            case "SET-TODOLISTS":
                return action.todoLists.map(tl => {
                    return {
                        ...tl,
                        filter: 'all'
                    }
                })
            default:
                return state
        }
    }

export const RemoveTodoListsAC = (todoListID: string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID: todoListID}
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListID: todoListID}
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, todoListID: todoListID}
}
export const setTodoListsAC = (todoLists: Array<TodolistType>): SetTodoListsAT => {
    return {
        type: 'SET-TODOLISTS', todoLists
    } as const
}

//thunkCreator

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch): void => {
        //1.side effect
        todolistApi.getTodolists()              //делаем запрос
            .then((res) => {
                //2.dispatch action
                dispatch(setTodoListsAC(res.data))  //затем диспатчим
            })

    }
}

export const removeTodolistTC = (todolistId:string) => {
    return (dispatch:Dispatch):void => {
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                dispatch(RemoveTodoListsAC(todolistId))
            })
    }
}