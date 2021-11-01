import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import React, {ChangeEvent, useCallback} from "react";
import {TaskStatuses, TaskType} from "./api/todolist-api";

type TaskPropsType = {
    todoListID: string
    task: TaskType,
    removeTask: (taskID: string, todoListID: string) => void,
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListID: string) => void,
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const taskClasses = props.task.status === TaskStatuses.Completed ? 'is-done' : '';

    function onClickHandler() {
        props.removeTask(props.task.id, props.todoListID)       //delete task
    }

    const onTitleChangeHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todoListID)  //change task title
    }, [props.changeTaskTitle, props.todoListID, props.task.id])

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        const newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListID) //change task status
    }

    return (
        <li className={taskClasses} key={props.task.id}>
            <span className={taskClasses}>
                <Checkbox
                    color={'primary'}
                    checked={props.task.status === TaskStatuses.Completed}
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