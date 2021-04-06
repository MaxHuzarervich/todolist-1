import React from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void    //отсутствие объявленного returna
    changeFilter: (value:FilterValuesType) => void
}

function TodoList(props: TodoListPropsType) {

    const tasks = props.tasks.map( t=> {
        const removeTask = () => props.removeTask(t.id)
//t - element массива
        return <li>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={removeTask}>Del</button>
        </li>

    })

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    { tasks }           //fewfe
                </ul>
                <div>
                    <button onClick={()=>props.changeFilter('all')}>All</button>
                    <button onClick={()=>props.changeFilter('active')}>Active</button>
                    <button onClick={()=>props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
}

export default TodoList;