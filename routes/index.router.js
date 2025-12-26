const { Router } = require("express");
const authRouter = require("./auth.router");
const mainRouter = require("./main.router");
const commentRouter = require("./comment.router");
const likeRouter = require("./like.router");
const blogRouter = require("./blog.router");

const router = Router();

router.use("/", authRouter);
router.use("/", mainRouter);
router.use("/", commentRouter);
router.use("/", likeRouter);
router.use("/blog", blogRouter);

module.exports = router;