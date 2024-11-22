const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const cors = require("cors");

// MongoDB connection string
const uri = "mongodb+srv://robertjnewton:xxcgLb4NsX0MflBz@cluster0.zuqhe.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}
connectToDB();

const db = client.db("jarvisDB"); // Replace with your database name
const collection = db.collection("testCollection"); // Replace with your collection name

// API to insert a document
app.post("/insert", async (req, res) => {
    try {
        const result = await collection.insertOne(req.body);
        res.status(200).json({ message: "Document inserted", id: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error inserting document", error: error.message });
    }
});

// API to fetch all documents
app.get("/documents", async (req, res) => {
    try {
        const documents = await collection.find({}).toArray();
        res.status(200).json(documents);
    } catch (error) {
        res.status(500).json({ message: "Error fetching documents", error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API server running at http://localhost:${PORT}`);
});
