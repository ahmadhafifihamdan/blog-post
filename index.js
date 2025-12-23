const express = require("express");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/env.config");
const app = express();
const router = require("./routes/index.router");

//  View Engine
app.set("view engine", "ejs");

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})