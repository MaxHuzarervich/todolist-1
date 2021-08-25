import React, {useCallback} from 'react';
import './App.css';
import TodoList from './todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    FilterValuesType,
    RemoveTodoListsAC
} from "./store/todolists-reducer";
import {addTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskStatuses, TaskType, TodolistType} from "./api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>          //типизация для вычисляемого значения
}

export function AppWithRedux() {
//BLL:

    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        let action = removeTaskAC(taskID, todoListID)
        dispatch(action)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        let action = addTaskAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, status:TaskStatuses, todoListID: string) => {
        let action = ChangeTaskStatusAC(taskID, status, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        let action = ChangeTaskTitleAC(taskID, newTitle, todoListID)
        dispatch(action)
    }, [dispatch])

    //todolist:

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        let action = ChangeTodoListFilterAC(value, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        let action = ChangeTodoListTitleAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todoListID: string) => {
        let action = RemoveTodoListsAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = AddTodoListAC(title)
        dispatch(action)
    }, [dispatch]) //зависимость dispatch

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
                    {
                        todoLists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper elevation={10}
                                       style={{
                                           padding: '15px',
                                           borderRadius: '10px',
                                           border: '1px solid lightblue'
                                       }}>
                                    <TodoList
                                        key={tl.id}                   //id for react мы его не используем
                                        todoListID={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
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
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}


