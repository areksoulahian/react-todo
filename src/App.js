import React, { useState, useRef, useEffect } from "react"; 
import { nanoid } from "nanoid";
import './App.css';
import Todo from './components/Todo';
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('App.js - handleSubmit - Hello, world!');
  }

  function addTask(name) {
    const newTask = { id: "id" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
    console.log(name + ' addTask - app.js');
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log(tasks[0])
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
    console.log(id)
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    /> )
  );

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />
  ));

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }


  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);
  

  return (
    <div className="todoapp">
      <h1>Todo App from Arek</h1>
      <Form onSubmit={handleSubmit} addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul 
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
        >
          {taskList}
        </ul>      
    </div>
  );
}

export default App; 
