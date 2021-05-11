import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void    //отсутствие объявленного return
    changeFilter: (value: FilterValuesType, todoListID: string) => void  //отсутствие объявленного return
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    const {filter} = props

    const tasksJSXElements = props.tasks.map(t => {

        const taskClasses = t.isDone ? 'is-done' : '';

        const removeTask = () => props.removeTask(t.id, props.todoListID);

        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.todoListID)

        return <li className={taskClasses} key={t.id}>
            <span className={taskClasses}>
                {/*<Checkbox*/}
                {/*color={'primary'}*/}
                {/*checked={t.isDone}*/}
                {/*onChange={props.changeTaskStatus}/>*/}

                <input onChange={(e) => {
                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
                }}
                       type="checkbox"
                       checked={t.isDone}/>
            <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
            </span>

            <IconButton onClick={removeTask}
                        color={'secondary'}
            >
                <Delete/>
            </IconButton>
        </li>
    })


    const onClickAllFilter = () => props.changeFilter("all", props.todoListID)

    const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)

    const onClickCompletedFilter = () => props.changeFilter("completed", props.todoListID)

    const onClickRemoveTodolist = () => props.removeTodolist(props.todoListID)

    const addTask = (title: string) => props.addTask(title, props.todoListID)

    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todoListID)


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
                    {tasksJSXElements}
                </ul>
                <div>
                    <Button size={'small'}
                            variant={filter === 'all' ? 'contained' : 'outlined'}
                            color={'primary'}
                            onClick={onClickAllFilter}>All</Button>
                    <Button size={'small'}
                            style={{marginLeft: 3}}
                            variant={filter === 'all' ? 'outlined' : 'contained'}
                            color={'primary'}
                            onClick={onClickActiveFilter}>Active
                    </Button>
                    <Button size={'small'}
                            style={{marginLeft: 3}}
                            variant={filter === 'all' ? 'outlined' : 'contained'}
                            color={'primary'}
                            onClick={onClickCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;