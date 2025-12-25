const { createCommentAndAttachToBlog } = require("../services/comment.service");

const addComment = async(req, res) => {
    const { blogId, commentText } = req.body;
    if (!blogId || !commentText || !commentText.trim()) {
        return res.status(400).json({ message: "Comment must not be empty" });
    }

    const userEmail = req.user.email;

    await createCommentAndAttachToBlog(blogId, commentText, userEmail);

    return res.redirect("/main");
}

module.exports = {
    addComment
}