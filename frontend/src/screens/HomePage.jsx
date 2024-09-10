import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import "../styles/HomePage.css";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import { getDoneTasks, getToDoTasks } from "../services/taskService";

export default function HomePage({ db }) {
  /**
   * States created using useState hook
   * usage: const [stateName, stateSetter] = useState(defaultStateValue);
   * 
   * The reason why we use useState() instead of just normal variables
   * is so that whenever the value of the state changes, the web-page will
   * rerender automatically. Whereas if we were to use variables, changes
   * in the value of the variable will not result in a rerender.
   */
  const [selectedBtn, setSelectedBtn] = useState("to-do");
  const [taskList, setTaskList] = useState([]);

  /**
   * useNavigate() is used to return to us a function that allows us to
   * navigate to other pages programatically by passing it a url path
   */
  const navigate = useNavigate();

  /**
   * useEffect is used when we want something to happen if there is a change
   * to some variable. These variables are termed as dependecies.
   * 
   * usage: useEffect(callbackFunction, [arrayOfDependencies])
   * 
   * The 2nd parameter is used to define the list of dependencies this useEffect
   * relies on. If any one of those dependencies changes, the callback function
   * will execute.
   * If dependency is empty, this useEffect will run on-mount (when webpage first loads)
   */
  useEffect(() => {
    fetchToDoTasks();
  }, []);

  // Helper functions
function fetchToDoTasks() {
  // call onto our functions making use of axios
  getToDoTasks()    // rmb: async function; "promises" to return the list of tasks
    .then((tasks) => {setTaskList(tasks)})   // then - to resolve a "promise" made by async -- function will take in the returned list
    // ^ updates the render to whatever we are fetching -- triggering re-render

    .catch((err) => {console.log(err)});     // catching error
};  

function fetchDoneTasks() {
  getDoneTasks() // comes from your taskService.js
    .then((tasks)=> {setTaskList(tasks)})
    .catch((err)=> {console.log(err)})
};

  return (
    <div className="main-container">
      {/* Search bar */}
      <SearchBar db={db} setTaskList={setTaskList} />

      <div>
        {/*  Show to-do list button */}
        <button
          className={
            selectedBtn === "to-do" ? "selected-btn" : "not-selected-btn"
          }
          onClick={() => {
            setSelectedBtn("to-do");
            fetchToDoTasks();
          }}
        >
          To-Do
        </button>

        {/* Show done list button */}
        <button
          className={
            selectedBtn === "done" ? "selected-btn" : "not-selected-btn"
          }
          onClick={() => {
            setSelectedBtn("done");
            fetchDoneTasks();
          }}
        >
          Done
        </button>

        {/* Create new task button */}
        <button
          className="add-task-btn"
          onClick={() => {
            navigate("/create-new-task");
          }}
        >
          Create New Task
        </button>
      </div>

      {/* Actual list of tasks */}
      <div className="task-list-container">
        {taskList.map((task) => {
          return (
            <TaskCard
              key={task.title}
              id={task._id}
              title={task.title}
              description={task.description}
              selectedBtn={selectedBtn}
              fetchDoneTasks={fetchDoneTasks}
              fetchToDoTasks={fetchToDoTasks}
            />
          );
        })}
      </div>
    </div>
  );
}
