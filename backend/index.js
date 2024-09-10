const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Server settings
const PORT = 8000;
const app = express();
const DB_URL = "mongodb://127.0.0.1:27017/messWAD_clean";
// const DB_URL = "mongodb://jaye3:0618Messwad!@<hostname>/?ssl=true&replicaSet=atlas-6flrsi-shard-0&authSource=admin&retryWrites=true&w=majority&appName=messwad2023";
app.use(express.json()); // Tells our server to read and understand JSON objects
app.use(cors());        // Allows cross-origin communication (ie. allow backend and frontend to talk to each other)

// Connecting to the DB
mongoose.connect(DB_URL);

// Verify connection status to DB
const db = mongoose.connection;
db.on("error", () => {
  console.log("[ERROR ] Failed to connect to DB!");
});
db.once("open", () => {
  console.log("[SYSTEM] Connected to MongoDB successfully!");
});

// Health check endpoint
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Server is up and running!",
  });
});

// Connect to any other router(s) that we have
app.use("/tasks", require("./routers/taskRouter"));

// Starts the actual server
app.listen(PORT, () => {
  console.log(`[SYSTEM] Server started on port ${PORT}...`);
});
