import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./screens/HomePage";
import AddTask from "./screens/AddTask";

export default function App() {
  const DATABASE = [
    { id: 1, title: "TASK 1", description: "Lorem Ipsum 1" },
    { id: 2, title: "TASK 2", description: "Lorem Ipsum 2" },
    { id: 3, title: "ABC 3", description: "Lorem Ipsum ABC" },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage db={DATABASE} />} />
        <Route path='/create-new-task' element={<AddTask db={DATABASE} />} />
      </Routes>
    </BrowserRouter>
  );
}
