import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reduce";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    newIsDoneValue: boolean
    todoListID: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}


export type ActionUnionType =
    RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodoListAT | RemoveTodoListAT

const initialState: TaskStateType = {}
//const initialState ={}
//initialStateType = typeOf


export const tasksReducer =
    (state = initialState, action: ActionUnionType): TaskStateType => {
        switch (action.type) {
            case 'REMOVE-TASK':
                let todoListTasks = state[action.todoListId];
                todoListTasks = todoListTasks.filter(task => task.id !== action.taskId);
                return {
                    ...state,
                    [action.todoListId]: state[action.todoListId].filter(task => task.id !== action.taskId)
                }
            case 'ADD-TASK':
                const newTask: TaskType = {
                    id: v1(),
                    title: action.title,
                    isDone: false
                }
                return {
                    ...state,
                    [action.todoListID]: [newTask, ...state[action.todoListID]]
                }
            case 'CHANGE-TASK-STATUS':
                return {
                    ...state, [action.todoListID]: state[action.todoListID].map(task => {
                        if (task.id === action.taskID) {
                            return {...task, isDone: action.newIsDoneValue}
                        } else return task
                    })
                }
            case 'CHANGE-TASK-TITLE':
                return {
                    ...state, [action.todoListID]: state[action.todoListID].map(task => {
                        if (task.id === action.taskID) {
                            return {...task, title: action.newTitle}
                        } else return task

                    })
                }
            case 'ADD-TODOLIST':
                return {
                    ...state,
                    [action.todolistId]: []
                }
            case 'REMOVE-TODOLIST':
                let newState = {...state}
                delete newState[action.todoListID]
                return newState
            default:
                return state
        }
    }


export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todoListId: todoListId}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todoListID: todoListID}
}
export const ChangeTaskStatusAC = (taskID: string, newIsDoneValue: boolean, todoListID: string):
    ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID: taskID, newIsDoneValue: newIsDoneValue, todoListID: todoListID}
}
export const ChangeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string):
    ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID: taskID, newTitle: newTitle, todoListID: todoListID}
}

