import {TaskStateType} from "../App";
import {AddTodoListAC, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TodolistType} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: Array<TodolistDomainType> = [];

    let todolist:TodolistType = {
        title:"New Todolist",
        id: 'any id',
        addedDate: '',
        order: 0
    }

    const action = AddTodoListAC(todolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodoLists).toBe(action.todolist.id);
});


