import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";

export default function SearchBar({ db, setTaskList }) {
  const [query, setQuery] = useState("");

  /**
   * Each time we type something in the search bar, it is called an event
   * which we denote as e (the parameter)
   * 
   * So each time we type something, which is on change, we take the event's target,
   * which is the text field
   * Then we take the value of the text field.
   * That is what it means by e.target.value
   */
  const onChange = (e) => {
    setQuery(e.target.value);
  };

  /**
   * This is the other use case of useEffect, where there is an actual dependency.
   * Each time we type something into the search bar, we want to see the corresponding
   * search results appear.
   * 
   * So the change here, is our search query, and when the query changes, we want to see new results.
   * Therefore, query is passed as a dependency.
   * And when that changes, we filter the db to look for task titles that contain the query.
   */
  useEffect(() => {
    const result = db.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
    setTaskList(result);
  }, [query]);

  // Refer to AddTask.jsx to understand what these properties mean
  return (
    <div>
      <input
        type="text"
        placeholder="Search for a task here..."
        onChange={onChange}
        className="search-bar"
      />
    </div>
  );
}
