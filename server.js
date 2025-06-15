/**
 * entry for my server
 */

const express = require("express");
const app = express();
const usersRouter = require("./src/routes/user.route")

const PORT = 5001;

app.get("/", (req, res) => {
    res.json({ message: "welcome to api homepage", status: 200, success: true })
})

app.use("/api", usersRouter);

app.listen(PORT, () => console.log(`Api server is running live on http://localhost:${PORT}`))