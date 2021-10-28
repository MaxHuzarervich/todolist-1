import {TaskStateType} from "../App";
import {AddTodoListAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TodolistType} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: Array<TodolistType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodoLists).toBe(action.todolistId);
});


