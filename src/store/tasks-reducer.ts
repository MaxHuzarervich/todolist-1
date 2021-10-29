import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

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
    status: TaskStatuses
    todoListID: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>,
    todoListID: string
}

export type ActionUnionType =
    RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodoListAT | RemoveTodoListAT | SetTodoListsAT | SetTasksActionType

const initialState: TaskStateType = {}

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
                    status: TaskStatuses.New,
                    todoListId: action.todoListID,
                    startDate: '',
                    deadline: '',
                    addedDate: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: ''

                }
                return {
                    ...state,
                    [action.todoListID]: [newTask, ...state[action.todoListID]]
                }
            case 'CHANGE-TASK-STATUS':
                return {
                    ...state, [action.todoListID]: state[action.todoListID].map(task => {
                        if (task.id === action.taskID) {
                            return {...task, status: action.status}
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
            case 'SET-TODOLISTS':
                const copyState = {...state};
                action.todoLists.forEach(tl => {
                    copyState[tl.id] = [];         // задаем новое св-во id
                })
                return copyState;
            case 'SET-TASKS': {
                const copyState = {...state}
                copyState[action.todoListID] = action.tasks       //нужно обратится к нужному св-ву по todolistid который из action приходит
                return copyState;
            }                                                    //чтобы обратится к нужному массиву для нужного тудулиста
                                                                 // и просто переопределить массив его тасок
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
export const ChangeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string):
    ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskID: taskID, status, todoListID: todoListID}
}
export const ChangeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string):
    ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID: taskID, newTitle: newTitle, todoListID: todoListID}
}
export const SetTasksAC = (tasks: Array<TaskType>, todoListID: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todoListID}
}

//THUNK

// export const fetchTasksThunk = (dispatch: Dispatch) => {
//
//     todolistApi.getTasks().then((res) => {
//         let tasks = res.data.items
//     })
//
// }