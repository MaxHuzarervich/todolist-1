import axios from "axios";

const instance = axios.create({
baseURL: 'https://social-network.samuraijs.com/api/1.1',
withCredentials: true,
    headers: {
        'API-KEY': 'aa1f6061-8f98-4319-8eee-239786445cdc'
    }
})

type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
    data: T
}

type TodoType = {
    id:string,
    addedDate: string,
    order: number,
    title: string
}

export const todolistApi = {
    getTodolists () {
        return  instance.get<Array<TodoType>>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('/todo-lists',{title})
    },
    deleteTodo(todolistId: string){
    return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string){
    return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`,{title})
    }
}
