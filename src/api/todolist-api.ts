import axios from "axios";

//axios создай на своей основе конкретный экземпляр
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '09fdfea4-0315-4da1-8525-2baf0617aa13'
    }
})

//если D не передавать то это пустой объект (ДЖЕНЕРИК тип)
export type CommonResponseType<D = {}> = {
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
    data: D
}
export type TodolistType = {
    id: string,
    addedDate: string,
    order: number,
    title: string
}


export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
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
    items: TaskType[]
}
type DeleteTask = {
    resultCode: number,
    messages: Array<string>
    data: {}
}
export type CreateUpdateTaskResponse<T = {}> = {
    resultCode: number,
    messages: Array<string>,
    data: T
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

//объект, который будет заниматься запросами на сервер!
export const todolistApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodo(title: string) {                 // уточняем D - TodolistType
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
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<DeleteTask>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<CreateUpdateTaskResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}

export const authAPI = {
login(data: LoginParamsType){                                         //делаем запрос на 'auth/login' и отправляем data
const promise = instance.post<CommonResponseType<{userId?: number}>>('auth/login', data)
    return promise
}
}
