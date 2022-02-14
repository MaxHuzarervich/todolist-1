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
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
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
    getTodoLists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodo(title: string) {                 // уточняем D - TodolistType
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
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
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {                                         //делаем запрос на 'auth/login' и отправляем data
        const promise = instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
        return promise
    },
    logout() {
        const promise = instance.delete<ResponseType<{ userId?: number }>>('auth/login')
        return promise
    },
    me() {
        const promise = instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me')
        return promise
    }
}
