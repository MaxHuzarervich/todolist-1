import React from 'react';
import './App.css';
import TodoList from './todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListsAC
} from "./store/todolists-reduce";
import {addTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, removeTaskAC} from "./store/tasks-reduce";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


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

function AppWithRedux() {
//BLL:

    const todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const tasks = useSelector<AppRootStateType,TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // const todoListID_1 = v1()
    // const todoListID_2 = v1()
    //
    // const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
    //     {id: todoListID_1, title: 'What to learn', filter: 'all'},
    //     {id: todoListID_2, title: 'What to buy', filter: 'all'},
    // ])
    //
    // const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todoListID_1]: [
    //         {id: v1(), title: 'HTML', isDone: true}, //true                  //импортируем v1() alt+enter
    //         {id: v1(), title: 'CSS', isDone: false},  //true
    //         {id: v1(), title: 'React', isDone: true},
    //     ],
    //     [todoListID_2]: [
    //         {id: v1(), title: 'Milk', isDone: true}, //true                  //импортируем v1() alt+enter
    //         {id: v1(), title: 'Meat', isDone: true},  //true
    //         {id: v1(), title: 'Bread', isDone: true},
    //     ]
    //
    // })

    function removeTask(taskID: string, todoListID: string) {
        let action = removeTaskAC(taskID,todoListID)
        dispatch(action)
    }

    function addTask(title: string, todoListID: string) {
        let action = addTaskAC(title,todoListID)
        dispatch(action)
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
       let action = ChangeTaskStatusAC(taskID,newIsDoneValue,todoListID)
        dispatch(action)
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        let action = ChangeTaskTitleAC(taskID,newTitle,todoListID)
        dispatch(action)
    }

    //todolist:

    function changeFilter(value: FilterValuesType, todoListID: string) {
       let action = ChangeTodoListFilterAC(value,todoListID)
        dispatch(action)
    }

    function changeTodolistTitle(title: string, todoListID: string) {
        let action = ChangeTodoListTitleAC(title,todoListID)
        dispatch(action)
    }

    function removeTodolist(todoListID: string) {
        let action = RemoveTodoListsAC(todoListID)
        dispatch(action)
    }

    function addTodolist(title: string) {
        let action = AddTodoListAC(title)
        dispatch(action)
    }

    function getTasksForTodolist(todoList: TodolistType) {

        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {

            return (
                <Grid item key={tl.id}>
                    <Paper elevation={10}
                           style={{padding: '15px', borderRadius: '10px',border:'1px solid lightblue'}}>
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

export default AppWithRedux;
