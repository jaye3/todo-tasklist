const Tasks = require("../models/taskModel");
// this doc deals with the RECEIVING and RESPONDING to the HTTP query


// GET endpoint to retrieve a list of all tasks
const getAllTasks = async (req, res) => {
  // Query the DB for a list of all tasks
  const allTasks = await Tasks.find({});

  // Respond to the user
  return res.status(200).json(allTasks);
};

// POST endpoint to add a new task to DB
const createNewTask = async (req, res) => {
  // Create a new task
  const newTask = req.body;

  // Check if the task title already exists in DB, exit
  const checkTask = await Tasks.findOne({
    title: newTask.title,
  });
  if (checkTask) {
    return res.status(400).json({
      message: "Task title already exists!",
    });
  }

  // Add the task to our DB
  const createdTask = await Tasks.create(newTask);

  // Respond to the user
  return res.status(201).json(createdTask);
};

// GET endpoint to retrieve all done tasks
const getDoneTasks = async (req, res) => {
  // Query the DB for tasks where done is true
  const doneTasks = await Tasks.find({
    done: true,
  });

  // Respond to the user with the list of tasks
  return res.status(200).json(doneTasks);
};

// GET endpoint to retrieve all to-do tasks
const getToDoTasks = async (req, res) => {
  // Query the DB for tasks where done is true
  const toDoTasks = await Tasks.find({
    done: false,
  });

  // Respond to the user with the list of tasks
  return res.status(200).json(toDoTasks);
};

// PUT endpoint to update task as done/not done
const updateTaskStatus = async (req, res) => {
  const taskID = req.params.id    // req.params.[nameOfWhatYouWannaRetrieve]

  // Query database to find this task by ID
  const foundTask = await Tasks.findOne ({
    _id: taskID   // look for task where _id (see it in mongo) = task id from the req URL
  });

  // If task does not exist, exit.
  if (!foundTask) {   // if not foundTask
    return res.status(404).json({   // this is a return statement -- ends the updateTaskStatus function!
      message: "Task ID not found."
    })
  };

  // (Task exists) Update the done status
  const update = {done: !foundTask.done}; // toggling between the 2 found states [if true, it toggles to false and vv]
  const updatedTask = await Tasks.updateOne({_id: taskID}, update); // to update task; .updateOne(identify which task, what to update)

  // Respond to user
  return res.status(200).json(updatedTask);
};

module.exports = {
  getAllTasks,
  createNewTask,
  getDoneTasks,
  getToDoTasks, 
  updateTaskStatus
};
