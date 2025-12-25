const { toggleLike } = require("../services/like.service");

const toggleLikeHandler = async(req, res) => {
    const { blogId } = req.body;
    const userEmail = req.user.email;
    if (!blogId) return res.redirect("/main");

    await toggleLike(blogId, userEmail);
    return res.redirect("/main");
}

module.exports = {
    toggleLikeHandler
}