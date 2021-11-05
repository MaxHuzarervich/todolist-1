import React from "react";
import {AppRootStateType, store} from "./store";
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/tasks-reducer";
import {todoListsReducer} from "../features/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {appReducer} from "./app-reducer";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: 'idle', addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: "todolistId1", startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: "todolistId1", startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todolistId2", startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed,
                todoListId: "todolistId2", startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            }
        ]
    },
    app: {
        error: null,
        status: 'idle'
    }
};                                  //если нет стейта который можно предзагружать, то applyMiddleware
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType,applyMiddleware(thunkMiddleware));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {

    return <Provider store={store}>{storyFn()}</Provider>
}