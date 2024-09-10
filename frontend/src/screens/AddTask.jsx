import React, { useState } from "react";
import "../styles/AddTask.css";
import { useNavigate } from "react-router-dom";
import { postNewTask } from "../services/taskService";

export default function AddTask({ db }) {
  const navigate = useNavigate();

  // Create a new state in the form of an object with name and desc
  const [data, setData] = useState({ name: "", desc: "" }); // what is taken in from input field

  /**
   * This function will be used by the input fields as defined below
   * (refer to line 63 and line 72)
   * e.target.name refers to the name of the input field
   * e.target.value refers to the value that we have typed in the input field
   *
   * Therefore, the name of the input field needs to match the keys
   * in our data state object
   * (e.g., data contains 'desc', so we need to have an input field named 'desc')
   *
   * ...data means keep the rest of the data object the same, just update the
   * part of data where the name of the key matches the name of the text field
   *
   * Quite hard to explain with just comments, so if anything not sure, just tele me
   */
  function onChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /**
   * This function is called when we click on the "Create New Task" button
   * Refer to line 82 to see how we bind this function to onClick of that button
   */
  async function createNewTask() {
    // Craft the new task JSON object (title, description, done)
    const newTask = {
      title: data.name, 
      description: data.desc, 
      done: false
    }

    // call on axios to send req (JSON format) to backend
    const isCreated = await postNewTask(newTask); // because postNewTask returns whether creation was successful or not (bool)

    // if successful, navigate user back to homepage
    if (isCreated) {
      navigate('/');
    } else {
      alert("Failed to create task.") 
    };

  };

  /**
   * So for each input html tag, you will see these few things:
   * - type="text" This just means this is a text input field
   * - placeholder="..." This is the text that will appear in the text field before typing anything in it
   * - name="..." This is to give a name to the text field, it links back to the explanation for onChange function (line 12)
   * - onChange={} This is used to denote the behaviour of what will happen when we type something in this text field.
   *               We passed it the onChange function defined above
   * - className - This is the name we give it to use for css styling, DIFFERENT from the above name property
   */
  return (
    <div className="main-container">
      {/* Input field for Task Name */}
      <input
        type="text"
        placeholder="Task Name"
        name="name"
        onChange={onChange}
        className="text-field"
      />

      {/* Input field for Task Description */}
      <input
        type="text"
        placeholder="Task Description"
        name="desc"
        onChange={onChange}
        className="text-field"
      />

      {/* Back Button */}
      <button className="add-task-btn" onClick={() => navigate("/")}>
        Back
      </button>

      {/* Create New Task Button */}
      <button className="add-task-btn" onClick={createNewTask}>
        Create New Task
      </button>
    </div>
  );
}
