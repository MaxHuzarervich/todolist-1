import React, {useState} from 'react';
import './App.css';
import TodoList from './todolist';


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'  // типизируем переменную filter

function App() {
//BLL:
    const [tasks, setTasks] = useState<Array<TaskType>>([   //tasks старые данные, setTasks ф-ция дает новые данные
        {id: 1, title: 'HTML', isDone: true}, //true
        {id: 2, title: 'CSS', isDone: true},  //true
        {id: 3, title: 'React', isDone: false}, //false
        {id: 4, title: 'React', isDone: false}]) //#345

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

    function removeTask(taskID: number) { //3
        const filteredTasks = tasks.filter(t => t.id !== taskID) //#346
        console.log(tasks)
        //Обновись!!!
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    //UI:
    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={getTasksForTodolist()}    //результат функции!
                      removeTask={removeTask}          //когда наступит момент!
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
