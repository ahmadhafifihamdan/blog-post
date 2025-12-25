const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { addComment } = require("../controllers/comment.controller");

const router = Router();

router.route("/comment").post(protect, addComment);

module.exports = router;