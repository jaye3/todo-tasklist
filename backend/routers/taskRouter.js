const express = require("express");
const {
  getAllTasks,
  createNewTask,
  getDoneTasks,
  getToDoTasks,
  updateTaskStatus,
} = require("../controllers/taskController");
const router = express.Router();

router.get("/", getAllTasks);
router.post("/", createNewTask);
router.get("/done", getDoneTasks);
router.get("/to-do", getToDoTasks);
router.put("/:id", updateTaskStatus); // : means id is meant to be an argument -- this is the name of the arg in taskID in PUT endpoint

module.exports = router;
