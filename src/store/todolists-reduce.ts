import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    title: string
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

export type ActionUnionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT



export const todoListsReducer =
    (todoLists: Array<TodolistType>, action: ActionUnionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case 'ADD-TODOLIST':
            const newTodolistID = v1()
            const newTodolist: TodolistType = {id: newTodolistID, title: action.title, filter: 'all'}
            return [...todoLists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListsAC = (todoListID:string): RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todoListID:todoListID}
}
export const AddTodoListAC = (title:string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST',title: title}
}
export const ChangeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
   return{type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todoListID}
}
export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListID: string): ChangeTodoListFilterAT => {
    return{type: 'CHANGE-TODOLIST-FILTER', filter: filter , todoListID: todoListID}
}
