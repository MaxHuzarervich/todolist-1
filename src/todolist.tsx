import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string) => void
    removeTask: (taskID: string) => void    //отсутствие объявленного returna
    changeFilter: (value: FilterValuesType) => void  //отсутствие объявленного returna
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
}

function TodoList(props: TodoListPropsType) {
    const {filter} = props
    // const filter = props.filter тоже что и выше
    const [title, setTitle] = useState('')
    const[error,setError] = useState<boolean>(false )
    const tasksJSXElements = props.tasks.map(t => {                   //чтобы массив tasks преобразовывался
        const taskClasses = t.isDone ? 'is-done' : '';
        const removeTask = () => props.removeTask(t.id)    //t - element массива //каждый объект мы преобразуем в li-шку,
                                                           //вместо каждого объекта мы хотим вернуть li-шку
        return <li className={taskClasses} key={t.id}>
            <input onChange={(e) => {props.changeTaskStatus(t.id, e.currentTarget.checked)}}
                type="checkbox"
                checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={removeTask}>Del</button>
        </li>
    })

    const addTask = () => {
        const trimmedTitle = title.trim()  //удаляет у строки все пробелы с двух сторон
        if(trimmedTitle){
            props.addTask(trimmedTitle)
        }else{setError(true)}
        setTitle('')

    }  //чтобы поле очищалось после добавления новой таски


    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)
        setError(false)}
    const onClickAllFilter = () => props.changeFilter("all")
    const onClickActiveFilter = () => props.changeFilter("active")
    const onClickCompletedFilter = () => props.changeFilter("completed")
    const errorMessage = error
        ? <div style={{color:'red'}}>Title is required!</div>
        : null

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input className={error ? 'error': ''}
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
                    <button className={filter === 'active' ? 'active-filter' : ''} onClick={onClickActiveFilter}>Active</button>
                    <button className={filter === 'completed' ? 'active-filter' : ''} onClick={onClickCompletedFilter}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;