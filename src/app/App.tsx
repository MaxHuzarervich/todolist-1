import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskType} from "../api/todolist-api";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "./app-reducer";
import {Login} from "../login/login";
import {TodolistList} from './TodolistList';
import {BrowserRouter, Route} from "react-router-dom";

export type TaskStateType = {
    [key: string]: Array<TaskType>          //типизация для вычисляемого значения
}

type AppWithReduxPropsType = {
    demo?: boolean
}

export const App: React.FC<AppWithReduxPropsType> = ({demo = false}) => {
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
                        Todolists
                    </Typography>
                    <Button color={'inherit'}
                            variant={'outlined'}
                    >Login
                    </Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Route exact path={'/login'} render={() => <Login />}/>
                <Route path={'/'} render={() => <TodolistList />}/>
            </Container>

        </div>
        </BrowserRouter>
    );
}


