import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

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

}

function TodoList(props: TodoListPropsType) {
    debugger
    const {filter} = props
    // const filter = props.filter тоже что и выше
    const [title, setTitle] = useState('')
    const [error, setError] = useState<boolean>(false)
    const tasksJSXElements = props.tasks.map(t => {
        const taskClasses = t.isDone ? 'is-done' : '';
        const removeTask = () => props.removeTask(t.id, props.todoListID);

        return <li className={taskClasses} key={t.id}>
            <input onChange={(e) => {
                props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            }}
                   type="checkbox"
                   checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={removeTask}>Del</button>
        </li>
    })

    const addTask = () => {
        const trimmedTitle = title.trim()  //удаляет у строки все пробелы с двух сторон
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle('') //чтобы поле очищалось после добавления новой таски

    }


    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAllFilter = () => props.changeFilter("all", props.todoListID)
    const onClickActiveFilter = () => props.changeFilter("active", props.todoListID)
    const onClickCompletedFilter = () => props.changeFilter("completed", props.todoListID)
    const onClickRemoveTodolist = () => props.removeTodolist(props.todoListID)
    const errorMessage = error
        ? <div style={{color: 'red'}}>Title is required!</div>
        : null

    return (
        <div>
            <div>
                <h3>{props.title}
                    <button onClick={onClickRemoveTodolist}>*</button>
                </h3>
                <div>
                    <input className={error ? 'error' : ''}
                           value={title}
                           onChange={onChangeTitle}
                           onKeyPress={onKeyPressAddTask}/>
                    <button onClick={addTask}>+</button>
                    {errorMessage}
                </div>
                <ul>
                    {tasksJSXElements}
                </ul>
                <div>
                    <button className={filter === 'all' ? 'active-filter' : ''} onClick={onClickAllFilter}>All</button>
                    <button className={filter === 'active' ? 'active-filter' : ''}
                            onClick={onClickActiveFilter}>Active
                    </button>
                    <button className={filter === 'completed' ? 'active-filter' : ''}
                            onClick={onClickCompletedFilter}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;