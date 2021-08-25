import axios from "axios";

//axios создай на своей основе конкретный экземпляр
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'b79e1a2a-851b-41b6-b0f0-5dddb90cc8ec'
    }
})

//если Т не передавать то это пустой объект
type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
    data: T
}

export type TodolistType = {
     id: string,
    addedDate: string,
    order: number,
    title: string
}
export enum TaskStatuses{
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities{
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType ={
    description: string,
    title: string,
    // completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
type GetTaskResponse = {
    error: string,
    totalCount: number,
}
type DeleteTask = {
    resultCode: number,
    messages: Array<string>
    data: {}
}
type CreateUpdateTaskResponse<T = {}> = {
    resultCode: number,
    messages:Array<string>,
    data: T
}

//объект, который будет заниматься запросами на сервер!
export const todolistApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete<DeleteTask>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateUpdateTaskResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`,{title})
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string){
        return instance.put<CreateUpdateTaskResponse<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`,{title})
    }
}
