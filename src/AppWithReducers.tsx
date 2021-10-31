import React, {useReducer} from 'react';
import './App.css';
import TodoList from './todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterValuesType,
    RemoveTodoListsAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodolistType} from "./api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>          //типизация для вычисляемого значения
}

function AppWithReducer() {
//BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {
                id: v1(), title: 'HTML', status: TaskStatuses.Completed,
                todoListId: todoListID_1, startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'CSS', status: TaskStatuses.Completed,
                todoListId: todoListID_1, startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.Completed,
                todoListId: todoListID_1, startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            },
        ],
        [todoListID_2]: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed,
                todoListId: todoListID_2, startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'Meat', status: TaskStatuses.Completed,
                todoListId: todoListID_2, startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            },
            {
                id: v1(), title: 'Bread', status: TaskStatuses.Completed,
                todoListId: todoListID_2, startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low, description: ''
            },
        ]

    })

    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID, todoListID)
        dispatchToTasks(action)
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC({
            todoListId: todoListID,
            title: title,
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: 0,
            startDate: '',
            id: 'id exists',
        })
        dispatchToTasks(action)
    }

    function changeTaskStatus(taskID: string, status: TaskStatuses, todoListID: string) {
        let action = ChangeTaskStatusAC(taskID, status, todoListID)
        dispatchToTasks(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = ChangeTaskTitleAC(taskID, newTitle, todoListID)
        dispatchToTasks(action)
    }

    //todolist:

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let action = ChangeTodoListFilterAC(value, todoListID)
        dispatchToTodoLists(action)
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        let action = ChangeTodoListTitleAC(title, todoListID)
        dispatchToTodoLists(action)
    }

    function removeTodolist(todoListID: string) {
        let action = RemoveTodoListsAC(todoListID)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

    function addTodolist(title: string) {
        let action = AddTodoListAC(title)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

    function getTasksForTodolist(todoList: TodolistType) {

        switch (todoList.id) {
            case "active":
                return tasks[todoList.id].filter(t => !t.status)
            case "completed":
                return tasks[todoList.id].filter(t => t.status)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {

            return (
                <Grid item key={tl.id}>
                    <Paper elevation={10}
                           style={{padding: '15px', borderRadius: '10px', border: '1px solid lightblue'}}>
                        <TodoList
                            key={tl.id}                   //id for react мы его не используем
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={getTasksForTodolist(tl)}
                            filter={tl.filter}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeTaskStatus={changeTaskStatus}
                            removeTodolist={removeTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                    </Paper>
                </Grid>
            )
        }
    )

    //UI:
    return (
        <div>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolists
                    </Typography>
                    <Button color={'inherit'}
                            variant={'outlined'}
                    >Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0px '}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default AppWithReducer;
