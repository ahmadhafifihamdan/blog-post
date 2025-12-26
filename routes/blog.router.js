const { Router } = require("express");
const { protect } = require("../middleware/auth.middleware");
const { getBlogForm, createBlogHandler } = require("../controllers/blog.controller");
const { uploadBlogImage } = require("../middleware/upload.middleware");

const router = Router();

router.route("/create")
    .get(protect, getBlogForm)
    .post(protect, uploadBlogImage, createBlogHandler);

module.exports = router;