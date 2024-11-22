const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Default route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Jarvis API!");
});

// Add your routes dynamically
app.use("/api/setup", require("./setup"));
app.use("/api/getSetupNote", require("./getSetupNote"));
app.use("/api/insertNote", require("./insertNote"));
app.use("/api/addTimestamp", require("./addTimestamp"));

// Error handling for non-matched routes
app.use((req, res) => {
  res.status(404).send("Route not found.");
});

module.exports = app;
