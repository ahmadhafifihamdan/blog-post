const { createNewBlog } = require("../services/blog.service");
const { uploadBlogImageToStorage } = require("../services/storage.service");

const getBlogForm = (req, res) => {
    return res.render("blog-creation");
}

const createBlogHandler = async (req, res) => {
    let imageUrl = '';
    let newBlogId = '';

    if (req.file) {
        try {
            const result = await uploadBlogImageToStorage(req.file);
            imageUrl = result.imageUrl;
        } catch (err) {
            return res.status(500).json({ message: "Image upload failed" });
        }
    }

    if (!String(req.body.title || "").trim() || !String(req.body.content || "").trim()) {
        return res.status(400).json({ message: "Blog title and content are mandatory" });
    }


    const { title, content, imageHeader } = req.body;

    try {
        newBlogId = await createNewBlog(
            {
                title,
                content,
                imageHeader: imageHeader || "",
                authorEmail: req.user.email,
                likeCount: 0,
                commentIds: [],
            },
            imageUrl);
    } catch (err) {
        return res.status(500).json({ message: "Blog creation fail. Try again." });
    }

    return res.cookie("current_blog_id", newBlogId).redirect("/blogs");
}


module.exports = {
    getBlogForm,
    createBlogHandler
}