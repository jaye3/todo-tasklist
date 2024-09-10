const mongoose = require("mongoose");

// Create a schema for how we should store task objects in the DB
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean
});

// Export the schema to use it in other files
module.exports = mongoose.model("Task", taskSchema);