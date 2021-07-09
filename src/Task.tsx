import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskType} from "./App";

type TaskPropsType = {
    todoListID:string
    task:TaskType,
    removeTask: (taskID: string, todoListID: string) => void,
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todoListID: string) => void,
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {

    const taskClasses = props.task.isDone ? 'is-done' : '';

    function onClickHandler () {
        props.removeTask(props.task.id, props.todoListID)       //delete task
    }
    const onTitleChangeHandler = useCallback((title:string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListID)  //change task title
    },[props.changeTaskTitle,props.todoListID,props.task.id])
    function onChangeHandler (e:ChangeEvent<HTMLInputElement>) {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID) //change task status
    }

    return (
        <li className={taskClasses} key={props.task.id}>
            <span className={taskClasses}>
                <Checkbox
                    color={'primary'}
                    checked={props.task.isDone}
                    onChange={onChangeHandler}/>

            <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler}/>
            </span>

            <IconButton onClick={onClickHandler}
                        color={'secondary'}
            >
                <Delete/>
            </IconButton>
        </li>
    )
})