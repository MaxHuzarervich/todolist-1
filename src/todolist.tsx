import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "./store/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./store/tasks-reducer";

type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
    demo?:boolean
}
                                       //конкретно demo вынуть, если не передали будет по умолчанию false
const TodoList = React.memo(({demo = false, ...props}:TodoListPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo) {     // если не демо режим, то загрузи таски с сервера --->
            return;
        }
        dispatch(fetchTasksTC(props.todolist.id)) //получить таски тудулиста
    }, [])


    // const {filter} = props

    const onClickAllFilter = useCallback(() => props.changeFilter("all", props.todolist.id),
        [props.changeFilter, props.todolist.id])

    const onClickActiveFilter = useCallback(() => props.changeFilter("active", props.todolist.id),
        [props.changeFilter, props.todolist.id])

    const onClickCompletedFilter = useCallback(() => props.changeFilter("completed", props.todolist.id),
        [props.changeFilter, props.todolist.id])

    const onClickRemoveTodolist = useCallback(() => props.removeTodolist(props.todolist.id),
        [props.removeTodolist, props.todolist.id])

    const addTask = useCallback((title: string) => props.addTask(title, props.todolist.id),
        [props.addTask, props.todolist.id])

    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.todolist.id),
        [props.changeTodolistTitle, props.todolist.id])

    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        props.removeTask(taskId, todoListID)
    }, [props.removeTask])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListID: string) => {
        props.changeTaskStatus(taskId, status, todoListID)
    }, [props.changeTaskStatus])
    const changeTaskTitle = useCallback((taskId: string, newValue: string, todoListID: string) => {
        props.changeTaskTitle(taskId, newValue, todoListID)
    }, [props.changeTaskTitle])

    return (
        <div>
            <div>
                <h3>
                    <EditableSpan title={props.todolist.title} changeTitle={changeTodolistTitle}/>
                    <IconButton onClick={onClickRemoveTodolist}
                                color={'secondary'}
                                disabled={props.todolist.entityStatus === 'loading'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
                <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                    {tasksForTodolist.map(t => {
                        return <Task
                            key={t.id}
                            todoListID={props.todolist.id}
                            task={t}
                            removeTask={removeTask}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}/>
                    })}
                </ul>
                <div>
                    <ButtonGroup>
                        <Button size={'small'}
                                variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                                color={'primary'}
                                onClick={onClickAllFilter}>All</Button>
                        <Button size={'small'}
                                style={{marginLeft: 3}}
                                variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                                color={'primary'}
                                onClick={onClickActiveFilter}>Active
                        </Button>
                        <Button size={'small'}
                                style={{marginLeft: 3}}
                                variant={props.todolist.filter === 'completed' ? 'contained' : 'text'}
                                color={'primary'}
                                onClick={onClickCompletedFilter}>Completed
                        </Button>
                    </ButtonGroup>

                </div>
            </div>
        </div>
    );
})

export default TodoList;