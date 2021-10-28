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

export type ActionUnionType =
    RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListTitleAT
    | ChangeTodoListFilterAT
    | SetTodoListsActionType

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
            case 'SET-TODOLISTS':
                return action.todos.map((tl) => {
                    return {...tl, filter: 'all'}
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
export const setTodolistsAC = (todos: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLISTS',
        todos
    } as const
}
export type SetTodoListsActionType = ReturnType<typeof setTodolistsAC>

//THUNK

export const fetchTodoListsThunk = (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    //1.side effect
    todolistApi.getTodolists()
        .then((res) => {
            let todos = res.data;
            //2.dispatch action
            dispatch(setTodolistsAC(todos))
        })
}