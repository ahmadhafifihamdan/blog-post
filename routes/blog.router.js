const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { getBlogForm } = require("../controllers/blog.controller");

const router = Router();

router.route("/create")
    .get(protect, getBlogForm);

module.exports = router;