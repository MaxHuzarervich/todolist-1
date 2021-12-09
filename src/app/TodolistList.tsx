import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import TodoList from "../features/TodolistList/Todolist/todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {
    addTodolistTC,
    ChangeTodoListFilterAC,
    changeTodolistTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "../features/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../features/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {Redirect} from "@reach/router";

export type TaskStateType = {
    [key: string]: Array<TaskType>          //типизация для вычисляемого значения
}

export const TodolistList = () => {
    //BLL:
    //для того чтобы забрать что нужно из redux используем useSelector
    //для того чтобы задиспатчить что то в redux используем hook useDispatch, который нам возвращает
    // функцию dispatch в который мы засовываем action который мы хотим как конструкцию отправить в redux

    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    debugger;
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isLoggedIn) {     // если мы не залогинены, то будет прерывание
           return
        }
        const thunk = fetchTodoListsTC()
        dispatch(thunk)  //получение тудулистов
    }, [dispatch]) // зависимостей нет, поэтому выполни его всего один раз когда вмонтируешься

    const removeTask = useCallback(function (taskID: string, todoListID: string) {
        const thunk = removeTaskTC(taskID, todoListID) //получаем санку при помощи санкреатора и диспатчим ее
        dispatch(thunk)
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        let action = addTaskTC(todoListID, title)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        let thunk = updateTaskTC(taskID, {status}, todoListID)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        let action = updateTaskTC(taskID, {title: newTitle}, todoListID)
        dispatch(action)
    }, [dispatch])

    //todolist:

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        let action = ChangeTodoListFilterAC(value, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        let thunk = changeTodolistTitleTC(todoListID, title)
        dispatch(thunk)
    }, [dispatch])

    const removeTodolist = useCallback((todoListID: string) => {
        let action = removeTodolistTC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

    if (!isLoggedIn) {
        debugger
        return <Redirect to={'/login'}/>
    }

    return <>
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
                                todolist={tl}
                                tasks={tasks[tl.id]}
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
    </>
}