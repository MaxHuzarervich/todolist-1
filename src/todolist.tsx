import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskID: string) => void    //отсутствие объявленного returna
    changeFilter: (value: FilterValuesType) => void  //отсутствие объявленного returna
}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState('')

    const tasksJSXElements = props.tasks.map(t => {                   //чтобы массив tasks преобразовывался
        const removeTask = () => props.removeTask(t.id)    //t - element массива //каждый объект мы преобразуем в li-шку,
                                                           //вместо каждого объекта мы хотим вернуть li-шку
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={removeTask}>Del</button>
        </li>
    })

    const addTask = () => {
        props.addTask(title)
        setTitle('')  }                              //чтобы поле очищалось после добавления новой таски

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.key === 'Enter'){
            addTask()
        }
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onClickAllFilter = () => props.changeFilter("all")
    const onClickActiveFilter = () => props.changeFilter("active")
    const onClickCompletedFilter = () => props.changeFilter("completed")

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input
                        value={title}
                        onChange= {onChangeTitle}
                         onKeyPress={onKeyPressAddTask}/>
                    <button onClick={addTask}>+</button>
                </div>
                <ul>
                    {tasksJSXElements}
                </ul>
                <div>
                    <button onClick={onClickAllFilter}>All</button>
                    <button onClick={onClickActiveFilter}>Active</button>
                    <button onClick={onClickCompletedFilter}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;