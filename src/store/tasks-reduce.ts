import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListID: string
}


export type ActionUnionType = RemoveTaskActionType | AddTaskActionType


export const tasksReducer =
    (state: TaskStateType, action: ActionUnionType): TaskStateType => {
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
