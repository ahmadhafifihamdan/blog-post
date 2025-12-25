const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { toggleLikeHandler } = require("../controllers/like.controller");

const router = Router();

router.route("/like").post(protect, toggleLikeHandler);

module.exports = router;