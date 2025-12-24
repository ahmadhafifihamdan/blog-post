const { Router } = require("express");
const authRouter = require("./auth.router");
const mainRouter = require("./main.router");

const router = Router();

router.use("/", authRouter);
router.use("/main", mainRouter);

module.exports = router;