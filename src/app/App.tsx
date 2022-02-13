import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {initializedAppTC, RequestStatusType} from "./app-reducer";
import {Login} from "../login/login";
import {TodolistList} from './TodolistList';
import {Route, Routes} from "react-router-dom";
import {TaskType} from "../api/todolist-api";
import {CircularProgress} from "@mui/material";
import {logoutTC} from "../login/auth-reducer";


export type TaskStateType = {
    [key: string]: Array<TaskType>          //типизация для вычисляемого значения
}

export const App = () => {
    // const navigate = useNavigate()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    //при запуске тут false, видим крутилку
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {             //санка которая делает запрос на me
        dispatch(initializedAppTC())

    }, []) //пустой массив зависимостей, значит эффект будет вызван один раз

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])


    // useEffect(() => {
    //     console.log(isLoggedIn)
    //     if (!isLoggedIn && isInitialized) {
    //         navigate("/login")
    //     }
    // }, [isLoggedIn, isInitialized])

    if (!isInitialized) { //крутилка, при инициализации
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
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
                    {isLoggedIn &&      //если залогинены, то покажи эту кнопку --->
                    <Button color={'inherit'} variant={'outlined'} onClick={logoutHandler}>Log out</Button>}
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

    );
}
