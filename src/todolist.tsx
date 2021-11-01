import React, {useCallback, useEffect} from 'react';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {FilterValuesType} from "./store/todolists-reducer";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./store/tasks-reducer";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('GET TASKS' + props.todoListID)
        dispatch(fetchTasksTC(props.todoListID)) //получить таски тудулиста
    }, [])


    const {filter} = props

    const onClickAllFilter = useCallback(() => props.changeFilter("all", props.todoListID),
        [props.changeFilter, props.todoListID])

    const onClickActiveFilter = useCallback(() => props.changeFilter("active", props.todoListID),
        [props.changeFilter, props.todoListID])

    const onClickCompletedFilter = useCallback(() => props.changeFilter("completed", props.todoListID),
        [props.changeFilter, props.todoListID])

    const onClickRemoveTodolist = useCallback(() => props.removeTodolist(props.todoListID),
        [props.removeTodolist, props.todoListID])

    const addTask = useCallback((title: string) => props.addTask(title, props.todoListID),
        [props.addTask, props.todoListID])

    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.todoListID),
        [props.changeTodolistTitle, props.todoListID])

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
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
                    <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <IconButton onClick={onClickRemoveTodolist}
                                color={'secondary'}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul style={{listStyle: 'none', paddingLeft: '0px'}}>
                    {tasksForTodolist.map(t => {
                        return <Task
                            key={t.id}
                            todoListID={props.todoListID}
                            task={t}
                            removeTask={removeTask}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}/>
                    })}
                </ul>
                <div>
                    <ButtonGroup>
                        <Button size={'small'}
                                variant={filter === 'all' ? 'contained' : 'text'}
                                color={'primary'}
                                onClick={onClickAllFilter}>All</Button>
                        <Button size={'small'}
                                style={{marginLeft: 3}}
                                variant={filter === 'active' ? 'contained' : 'text'}
                                color={'primary'}
                                onClick={onClickActiveFilter}>Active
                        </Button>
                        <Button size={'small'}
                                style={{marginLeft: 3}}
                                variant={filter === 'completed' ? 'contained' : 'text'}
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