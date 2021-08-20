import axios from "axios";

//axios создай на своей основе конкретный экземпляр
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'b79e1a2a-851b-41b6-b0f0-5dddb90cc8ec'
    }
})

type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
    data: T
}

type TodoType = {
     id: string,
    addedDate: string,
    order: number,
    title: string
}
type TaskType ={
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
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

//объект, который будет заниматься запросами на сервер!

export const todolistApi = {
    getTodolists() {
        return instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('/todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    }
}
