const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { mainPage, nextBlog } = require("../controllers/main.controller");

const router = Router();

router.route("/main").get(protect, mainPage);

router.route("/next").post(protect, nextBlog);

module.exports = router;