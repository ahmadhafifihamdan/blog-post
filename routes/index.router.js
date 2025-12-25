const { Router } = require("express");
const authRouter = require("./auth.router");
const mainRouter = require("./main.router");
const commentRouter = require("./comment.router");

const router = Router();

router.use("/", authRouter);
router.use("/", mainRouter);
router.use("/", commentRouter);

module.exports = router;