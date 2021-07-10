import React, {useState} from 'react';
import './App.css';
import TodoList from './todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type TaskType = {
    id: string                          //меняем на string
    title: string
    isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'  // типизируем переменную filter

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>          //типизация для вычисляемого значения
}

function App() {
//BLL:

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true}, //true                  //импортируем v1() alt+enter
            {id: v1(), title: 'CSS', isDone: false},  //true
            {id: v1(), title: 'React', isDone: true},
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Milk', isDone: true}, //true                  //импортируем v1() alt+enter
            {id: v1(), title: 'Meat', isDone: true},  //true
            {id: v1(), title: 'Bread', isDone: true},
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
            isDone: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t)
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
            TodolistType = {id: newTodolistID, title: title, filter: 'all'}
        setTodoLists([...todoLists, newTodolist])
        setTasks({...tasks, [newTodolistID]: []})
    }


    const todoListsComponents = todoLists.map(tl => {

            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
            }
            if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
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
