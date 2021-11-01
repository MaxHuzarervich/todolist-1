import React, {useState} from 'react';
import './App.css';
import TodoList from '../../src/todolist';
import {v1} from "uuid";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {FilterValuesType, TodolistDomainType} from "../store/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>          //типизация для вычисляемого значения
}

function App() {
//BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
            },                   //импортируем v1() alt+enter
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
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todoListID,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(taskID: string, status: TaskStatuses, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, status: status} : t)
        setTasks({...tasks})
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title: newTitle} : t)
        setTasks({...tasks})
    }

    //todolist:

    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title: title} : tl))
    }

    function removeTodolist(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    }

    function addTodolist(title: string) {
        const newTodolistID = v1()
        const newTodolist:
            TodolistDomainType = {id: newTodolistID, title: title, filter: 'all', addedDate: '', order: 0}
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }


    const todoListsComponents = todoLists.map(tl => {

            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
            }
            if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
            }

            return (
                <Grid item key={tl.id}>
                    <Paper elevation={10}
                           style={{padding: '15px', borderRadius: '10px', border: '1px solid lightblue'}}>
                        <TodoList
                            key={tl.id}                   //id for react мы его не используем
                            todoListID={tl.id}
                            title={tl.title}
                            tasks={tasksForTodolist}
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

export default App;
