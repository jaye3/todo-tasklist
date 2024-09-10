import React from "react";
import { updateTaskStatus } from "../services/taskService";
import "../styles/TaskCard.css"

export default function TaskCard({id, title, description, selectedBtn, fetchToDoTasks, fetchDoneTasks}) {

  // Helper function
  async function toggleTaskStatus() {
    // call on axios to make request
    await updateTaskStatus(id);

    // Re-fetch the list of updated tasks
    if (selectedBtn === 'to-do') {
      fetchToDoTasks();
    } else {
      fetchDoneTasks();
    }
  };
  
  return (
    <div className="card-body">
      <h1 className="card-title">{title}</h1>
      <p className="card-description">{description}</p>

      <input type="checkbox" className="card-button" 
      onClick={toggleTaskStatus}/>
    </div>
  );
}
