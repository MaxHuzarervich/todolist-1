import React, {useState} from 'react';
import './App.css';
import TodoList from './todolist';
import {v1} from "uuid";


export type TaskType = {
    id: string                          //меняем на string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'  // типизируем переменную filter

function App() {
//BLL:


    const [tasks, setTasks] = useState<Array<TaskType>>([   //tasks старые данные, setTasks ф-ция дает новые данные
        {id: v1(), title: 'HTML', isDone: true}, //true                  //импортируем v1() alt+enter
        {id: v1(), title: 'CSS', isDone: true},  //true
        {id: v1(), title: 'React', isDone: false}, //false
        {id: v1(), title: 'React', isDone: false}]) //#345

    const [filter, setFilter] = useState<FilterValuesType>('all')

    // задача ф-ции setFilter,при каждом вызове переменной filter,вызывать перерисовку интерфейса
    function getTasksForTodolist() {
        switch (filter) {                              //если значение переменной filter
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    function removeTask(taskID: string) {
        const filteredTasks = tasks.filter(t => t.id !== taskID) //#346
        console.log(tasks)
        //Обновись!!!
        setTasks(filteredTasks)
    }

    function addTask(title: string){                 //ф-ция для добавления новых тасок
     const newTask: TaskType = {
         id: v1(),
         title: title,
         isDone: false
     }

     setTasks([newTask,...tasks])          //новая таска + старые таски
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean){
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: newIsDoneValue} : t))
    }
    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    //UI:
    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={getTasksForTodolist()}
                      filter={filter}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
