const { toggleLike } = require("../services/like.service");

const toggleLikeHandler = async(req, res) => {
    const { blogId } = req.body;
    const userEmail = req.user.email;

    toggleLike(blogId, userEmail);
}

module.exports = {
    toggleLikeHandler
}