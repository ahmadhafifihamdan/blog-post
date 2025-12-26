const { createCommentAndAttachToBlog } = require("../services/comment.service");

const addCommentHandler = async(req, res) => {
    const { commentText } = req.body;
    const { blogId } = req.params;

    if (!blogId || !commentText || !commentText.trim()) {
        return res.status(400).json({ message: "Comment must not be empty" });
    }

    const userEmail = req.user.email;

    await createCommentAndAttachToBlog(blogId, commentText, userEmail);

    return res.redirect("/blogs");
}

module.exports = {
    addCommentHandler
}