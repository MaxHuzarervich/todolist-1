import {todolistApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setStatusAC} from "../App/app-reducer";

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
    entityStatus: RequestStatusType
}

export const todoListsReducer =
    (state = initialState, action: ActionUnionType): Array<TodolistDomainType> => {
        switch (action.type) {
            case 'REMOVE-TODOLIST':
                return state.filter(tl => tl.id !== action.todoListID)
            case 'ADD-TODOLIST': {
                const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all', entityStatus:'idle'}
                //забираем все из того тодолиста что приходит с сервера + filter: 'all'
                return [newTodolist, ...state]
            }
            case 'CHANGE-TODOLIST-TITLE':
                return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
            case 'CHANGE-TODOLIST-FILTER':
                return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
            case "SET-TODOLISTS":
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
    return {type: "REMOVE-TODOLIST", todoListID}
}
export const AddTodoListAC = (todolist: TodolistType): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListID}
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, todoListID}
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

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch): void => {
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                dispatch(RemoveTodoListsAC(todolistId))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch): void => {
        dispatch(setStatusAC('loading'))
        todolistApi.createTodo(title)
            .then((res) => {
                dispatch(AddTodoListAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch): void => {
        todolistApi.updateTodoTitle(todolistId,title)
            .then((res) => {
                dispatch(ChangeTodoListTitleAC(title,todolistId))
            })
    }
}