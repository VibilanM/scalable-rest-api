require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected.");
    })
    .catch((err) => {
        console.log(err);
    });

const authRoutes = require("./routes/auth.js");
const noteRoutes = require("./routes/notes");

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', noteRoutes);

app.get('/', (req, res) => {
    res.send("Server running.");
});

app.listen(5000, () => {
    console.log("Server is running in PORT 5000");
});