const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { mainPage } = require("../controllers/main.controller");

const router = Router();

router.route("/").get(protect, mainPage);

module.exports = router;