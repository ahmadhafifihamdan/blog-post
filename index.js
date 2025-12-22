const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

//  View Engine
app.set("view engine", "ejs");


// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})