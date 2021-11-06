import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";
import {Login} from "../login/login";
import {TodolistList} from './TodolistList';
import {BrowserRouter, Route} from "react-router-dom";
import { Routes } from "react-router-dom";
import {TaskType} from "../api/todolist-api";


export type TaskStateType = {
    [key: string]: Array<TaskType>          //типизация для вычисляемого значения
}

export const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    return (
        <BrowserRouter>
            <div>
                <ErrorSnackbar/>
                <AppBar position={'static'}>
                    <Toolbar style={{justifyContent: 'space-between'}}>
                        <IconButton color={'inherit'}>
                            <Menu/>
                        </IconButton>
                        <Typography variant={'h6'}>
                            TodoLists
                        </Typography>
                        <Button color={'inherit'}
                                variant={'outlined'}
                        >Login
                        </Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                    <Route path='/' element={<TodolistList/>}/>
                    <Route path='/login' element={<Login/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}


