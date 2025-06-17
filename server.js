/**
 * entry for my server
 */

const express = require("express");
const app = express();
const usersRouter = require("./src/routes/user.route") // routes 
const { redisStart } = require("./src/config/redis"); //redis connection


const PORT = 5001;

// connect redis
redisStart();

// root homepage
app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome to my api homepage" });
});

// routes
app.use("/api", usersRouter); // servers http responses

// server entry
app.listen(PORT, () => console.log(`🛩️  Api server is running live on http://localhost:${PORT}`))
