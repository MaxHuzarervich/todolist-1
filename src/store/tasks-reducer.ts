import {TaskStateType} from "../App/App";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListsAT} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setErrorAC, SetErrorActionType} from "../App/app-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskID: string
    model: UpdateDomainTaskModelType
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
    RemoveTaskActionType | AddTaskActionType | UpdateTaskActionType | ChangeTaskTitleActionType |
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
            case 'ADD-TASK': {
                const stateCopy = {...state}
                const newTask = action.task
                const tasks = stateCopy[newTask.todoListId]
                const newTasks = [newTask, ...tasks]
                stateCopy[newTask.todoListId] = newTasks
                return stateCopy
            }
            case 'UPDATE-TASK':
                return {
                    ...state, [action.todoListID]: state[action.todoListID].map(task => {
                        if (task.id === action.taskID) {
                            return {...task, ...action.model}
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
                    [action.todolist.id]: []
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
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todoListID: string):
    UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', taskID: taskID, model, todoListID: todoListID}
}
export const ChangeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string):
    ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID: taskID, newTitle: newTitle, todoListID: todoListID}
}
export const SetTasksAC = (tasks: Array<TaskType>, todoListID: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todoListID}
}

//THUNK - ф-ция которая делает асинхронную операцию и по итогу диспатчит экшн

//thunkCreator

export const fetchTasksTC = (todoListID: string) => {
    return (dispatch: Dispatch): void => {
        todolistApi.getTasks(todoListID)
            .then((res) => {
                const tasks = res.data.items
                const action = SetTasksAC(tasks, todoListID)
                dispatch(action)
            })

    }
}  //замыкание - здесь наша санка использует параметры из санккреатора           !!!!!!!

export const removeTaskTC = (taskID: string, todoListID: string) => {
    return (dispatch: Dispatch): void => {
        todolistApi.deleteTask(todoListID, taskID)
            .then((res) => {
                let action = removeTaskAC(taskID, todoListID)
                dispatch(action)
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionUnionType | SetErrorActionType>) => {
        todolistApi.createTask(todolistId, title)
            .then((res) => {
                if(res.data.resultCode === 0){
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)}
                else{
                    if(res.data.messages.length){
                        dispatch(setErrorAC(res.data.messages[0]))
                    }else {setErrorAC('some error occurred')}
                }
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, todoListID: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType): void => {
        const state = getState()
        const task = state.tasks[todoListID].find(t => t.id === taskID)
        if (!task) {
            console.warn('task is not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...domainModel     //у domainModel может быть только одно свойство, мы его перезатрем а остальные оставим
        }
        todolistApi.updateTask(todoListID, taskID, apiModel)
            .then((res) => {
                const action = updateTaskAC(taskID, domainModel, todoListID)
                dispatch(action)
            })
    }
}